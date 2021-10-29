const { CATEGORY_NAME } = require('../../config/constants');
const { queryAndReturn, getQueryResults } = require('../utils/lib');

exports.getArticles = (req, res) => {

    let cond = req.query.all ? '1' : 'a.active';
    let limit_by = (req.query.limit > 0) ? `LIMIT ${req.query.start}, ${req.query.limit}` : "";
    const day_threshold_for_new = 5;
    let query = `SELECT c.CategoryName,
                a.*, group_concat(t.tag_text) AS tag_list, timestampdiff(DAY, a.created, now()) < ${day_threshold_for_new} is_new 
                FROM article a 
                LEFT JOIN articletags atg on a.id = atg.article_id 
                LEFT JOIN tags t on t.id = atg.tag_id
                INNER JOIN category c ON a.CategoryId = c.CategoryId
                WHERE ${cond} = 1
                GROUP BY a.id
                ORDER BY a.created desc, a.updated desc
                ${limit_by}`;

    getQueryResults(query)
        .then((articles) => {

            let list = [];

            for (const a of articles) {
                let categoryObj = list.find(l => l.CategoryName == a.CategoryName);

                if (categoryObj == null) {
                    list.push({
                        CategoryName: a.CategoryName,
                        articles: [a]
                    })
                }
                else {
                    categoryObj.articles.push(a);
                }
            }


            return res.status(200).send({
                status: true,
                data: list
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).send({
                status: false,
                err
            })
        })
}


exports.getArticleBySlug = (req, res) => {
    let query = `SELECT c.CategoryName, a.*, u.FullName,
                group_concat(t.tag_text) AS tag_list 
                FROM article a 
                JOIN user_info u ON a.user_id = u.UserId
                LEFT JOIN articletags atg on a.id = atg.article_id 
                LEFT JOIN tags t on t.id = atg.tag_id 
                LEFT JOIN category c on c.CategoryId = a.CategoryId
                WHERE a.active = 1
                AND a.url = '${req.params.slug}' 
                GROUP BY a.id
                ORDER BY a.created desc, a.updated desc`;

    return queryAndReturn(res, query);
}