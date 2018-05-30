const article_services = require('../services/articles')

let operate_article = {
    async  get_aboutMe(ctx){
        let aboutMe = await article_services.get_article_by_id("1");
        console.log("con: "+aboutMe);
        ctx.body = aboutMe;
    }
}

module.exports = operate_article;