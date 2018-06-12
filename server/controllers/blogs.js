const article_model = require('../models/articles');
const tag_model = require('../models/tags');
const get_file = require('../utils/file');
const filter_markdown = require('../utils/filter_markdown');


let blogs = {
    /**
     * 获取blogs页初始数据
     * @param {Object} ctx 
     */
    async get_blogs(ctx){
        let datas = {status: "err"};
        let articles;
        let article_count;
        let lengths = ctx.query.lengths ? ctx.query.lengths : 8;
        let start = ctx.query.start ? ctx.query.start : 0 ;
        
        let tags = await tag_model.get_all_tags();
        
        if(ctx.query.tag != undefined){
            
            articles = await article_model.get_article_by_tag_limit(ctx.query.tag, parseInt(start), parseInt(lengths));
            
            article_count = await article_model.get_article_count_by_tag(ctx.query.tag);
        }
        else{
            articles = await article_model.get_article_by_limit(0, parseInt(lengths));
            for(let i = 0; i < articles.length; i++){
                let article = articles[i];
                article.article_content = await get_file(article.article_path)
                article.article_content = await filter_markdown(article.article_content);
                article.article_content = article.article_content.slice(0,100)+'...';
            }
            article_count= await article_model.get_article_count();
        }
        article_count = article_count[0].count;
        var pa = Math.ceil(article_count/lengths);
		var number = pa >= 3 ? 3 : pa;
        let article_paging = {
			page: 1,
			lengths: lengths,
            count: article_count,
            number: number
        }
        if(tags.length != 0 && articles.length != 0){
            datas = {tags, articles, article_paging};
            await ctx.render(`blog${ctx.request.url.split('?')[0]}`, datas);
        }
        else{
            ctx.body = datas;
        }
        
    }
};

module.exports = blogs;