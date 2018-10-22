const jwt = require('jsonwebtoken');

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
        let contact = {name:null,email:null,message:null,time:datetime.getNowDatetime(),saw:'no'};
        Object.assign(contact,body_contact);
        let result = await contact_model.insert_contacts(contact)
        ctx.body = result;
    },

    async login(ctx){
        console.log(ctx.query.body)
        const user = ctx.request.body
        if(user && user.name) {
            let userToken = {
                name: user.name
            }
            const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
            ctx.body = {
                message: '获取token成功',
                code: 1,
                token
            }
        } else {
            ctx.body = {
                message: '参数错误',
                code: -1
            }
        }
    },
    
}
module.exports = operate_api;