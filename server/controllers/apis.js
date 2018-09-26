const contact_model = require('../models/contacts');
const article_model = require('../models/articles');
const datetime = require('../utils/datetime');
const xss = require('node-xss').clean;

let operate_api = {
    /**
     * 点赞
     * @param {Object} ctx 
     */
    async like(ctx){
        let response_data = {status:"error"}
        let condition = ctx.request.body;
        let article = await article_model.get_article(condition);
        article = article[0];
        article.praise++;
        let result = await article_model.update_article(article); 
        if(result.affectedRows == 1){
            response_data.status = "success"
        }
        ctx.body = response_data;
    },
    /**
     * 发消息联系我
     * @param {Object} ctx 
     */
    async contact_me(ctx){
        let body_contact = xss(ctx.request.body);
        let contact = {name:null,email:null,message:null,time:datetime.getNowDatetime(),saw:'否'};
        Object.assign(contact,body_contact);
        let result = await contact_model.insert_contacts(contact)
        ctx.body = result;
    },
    
}
module.exports = operate_api;