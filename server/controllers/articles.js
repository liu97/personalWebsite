const article_models = require('../models/articles');
const tag_models = require('../models/tags');
const to_models = require('../models/tag_to_article');
const get_file = require('../utils/file');
const config = require('../../config');
const path = require('path');
const datetime = require('../utils/datetime');
const fs = require('fs');
/**
 * 控制层操作
 */
function tags_format(tags){
    tags = Array.from(new Set( tags.replace(/\s|\n/g,'').split(/,|，/) )); //去空格回车、分割，,、去重
    tags = tags.filter(function(x){  //去空串''
        return x != '';
    })
    return tags;
}
let operate_article = {
    /**
     * 新增文章
     * @param {Object} ctx 
     */
    async insert_article(ctx){
        let message = "success";
        let article = {title:null,tags:null,article_path:null,praise:0,upload_time:datetime.getNowDatetime(),last_modify_time:null,type:null};
        Object.assign(article,ctx.request.body);
        // 将文章内容写入存储
        let now_date = new Date().toLocaleDateString();
        let article_dir = path.join(config.root,`resources/article/${now_date}`);
        if(!fs.existsSync(article_dir)){
            fs.mkdirSync(article_dir);
        }
        let article_path = path.join(article_dir,article.title+'.md');
        fs.writeFile(article_path,article.content,function(err){
            if (err) {
                return console.error(err);
            }
        });
        article.article_path = `resources/article/${now_date}/${article.title}.md`;
        let tags = tags_format(article.tags)
        //将信息存入articles表
        article.tags = tags.join(',');
        let new_article = await article_models.insert_article(article);
        //将tags存入tags表
        for(let i = 0; i < tags.length; i++){
            let item = tags[i];
            let result = await tag_models.get_tag_by_name(item);
            if(result.length == 0){
                let tag = {tag_name : item, number : 1};
                let new_tag = await tag_models.insert_tag(tag);
                // 将tags与articles的关系存入tag_to_article表中
                await to_models.insert_to(new_tag.insertId,new_article.insertId);
            }
            else{
                result[0].number++;
                await tag_models.upload_tag(result[0]);
                // 将tags与articles的关系存入tag_to_article表中
                await to_models.insert_to(result[0].tag_id,new_article.insertId);
            }
        }
        
        ctx.body = message;
        
    },
    /**
     * 删除文章   
     * @param {Object} ctx 
     */
    async delete_article(ctx){
        let message = "success";
        let article_id = ctx.params.id;
        //改变对应标签个数
        let tags = await to_models.get_tags_by_article_id(article_id);
        for(let i = 0; i < tags.length; i++){
            tags[i].number--;
            await tag_models.upload_tag(tags[i]);
        }
        // 删除对应文章,因为设置了外键CASCADE，所以tag_to_article对应数据会自动删除 
        let result = await article_models.delete_article(article_id);
        if(result.affectedRows == 0){
            message = "error"
        }
        ctx.body = message;
    },
    /**
     * 更新文章
     * @param {Object} ctx 
     */
    async update_article(ctx){
        let message = "success";
        let article_id = ctx.params.id;
        let article = await article_models.get_article_by_id(article_id);
        article = article[0];
        Object.assign(article,ctx.request.body);
        let result = await article_models.update_article(article);
        if(result.affectedRows == 0){
            message = "error";
        }
        ctx.body = message;
    },
    /**
     * 获取文章
     * @param {Object} ctx 
     */
    async get_article(ctx){
        
        let articles = null;
        if ( Object.keys(ctx.params).length == 0 ){
            articles = await article_models.get_all_article();
        }
        else if( Object.keys(ctx.query).length != 0 ){
            if(ctx.query.type){
                articles = await article_models.get_article_by_type(ctx.query.type);
            }
        }
        else{
            articles = await article_models.get_article_by_id(ctx.params.id)
        }
        if(articles.length == 0){ //没有获取到文章
            ctx.redirect('/articles/');
        }
        else{
            let datas = [];
            articles.forEach(article => {
                datas.push( get_file(article.article_path) )
            });
            ctx.body = datas;
        }
       
    },
    /**
     * 上传图片
     * @param {Object} ctx 
     */
    async upload_img(ctx){ 
        let file_path = ctx.req.file.path;
        file_path = file_path.split('static\\');
        let file_url = file_path[file_path.length-1];
        let result = { success: 1,
            message: "上传成功",
            url: file_url
        }; 	   
        ctx.body = result
    },
    
};

module.exports = operate_article;