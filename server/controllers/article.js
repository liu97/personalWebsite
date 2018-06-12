const article_model = require('../models/articles');
const tag_model = require('../models/tags');
const get_file = require('../utils/file');


let blogs = {
    /**
     * 获取blogs页初始数据
     * @param {Object} ctx 
     */
    async get_article(ctx){
        let datas = {status: "err"};
        
        let tags = await tag_model.get_all_tags();
        if(tags.length != 0){
            datas = {tags};
            await ctx.render(`blog/article`, datas);
        }
        else{
            ctx.body = datas;
        }
        
    }
};

module.exports = blogs;