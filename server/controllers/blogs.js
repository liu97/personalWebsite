const article_model = require('../models/articles');
const tag_model = require('../models/tags');
const get_file = require('../utils/file');

let blogs = {
    /**
     * 获取blogs页初始数据
     * @param {Object} ctx 
     */
    async get_blogs(ctx){
        let datas = {status: "err"}
        let tags = await tag_model.get_all_tags();
        let articles = await article_model.get_article_by_limit(0,5);
        for(let i = 0; i < articles.length; i++){
            let article = articles[i];
            article.article_content = await get_file(article.article_path)
        }
        if(tags.length != 0 && articles.length != 0){
            datas = {tags, articles};
            datas.status = "success";
        }
        ctx.body = datas;
    }
};

module.exports = blogs;