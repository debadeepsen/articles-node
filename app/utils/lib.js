

exports.queryAndReturn = (res, queryText) => {
    const mysql = require('../controllers/mysql.controller');
    mysql.query(queryText)
        .then(({ response }) => {
            res.status(200).send({
                success: true,
                data: response
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                err,
                data: null
            });
        })
}


exports.getQueryResults = (queryText) => {

    const mysql = require('../controllers/mysql.controller');

    return new Promise((resolve, reject) => {
        mysql.query(queryText)
            .then(({ response }) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

