module.exports = (app) => {
    const main = require('../controllers/main.controller.js');

    app.get('/articles', main.getArticles);
    app.get('/article/:slug', main.getArticleBySlug);

}