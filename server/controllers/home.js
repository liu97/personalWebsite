const article_model = require('../models/articles');
const get_file = require('../utils/file');


let home = {
    async get_home(ctx){
        let data = {status: "err"};

        let about_me = await article_model.get_article_by_type('about_me');
        about_me[0].article_content = await get_file(about_me[0].article_path);
        let new_article = await article_model.get_article_by_desc(3);
        for(let i = 0; i < new_article.length; i++){
            let article = new_article[i];
            article.article_content = await get_file(article.article_path)
        }
        if(about_me.length != 0 && new_article.length != 0){
            data = {about_me,new_article};
            data.status = "success";
        }
        
        ctx.body =  data;
    }
}

module.exports = home