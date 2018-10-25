const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const xss = require('node-xss').clean;

const contact_model = require('../models/contacts');
const article_model = require('../models/articles');
const user_model = require('../models/users');
const datetime = require('../utils/datetime');
const config = require('../../config');


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
        const data = ctx.request.body;
        const user = await user_model.get_user({user_name: data.userName});  // 查询用户
        // 判断用户是否存在
        if (user[0]) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user[0].user_password)) {
                // 用户token
                const userToken = {
                    name: user[0].user_name,
                    id: user[0].user_id
                }
                const token = jwt.sign(userToken, config.secret, {expiresIn: '1h'})  // 签发token
                ctx.body = {
                    message: '成功',
                    token,
                    code: 1
                }
            } 
            else {
                ctx.body = {
                    code: -1,
                    message: '用户名或密码错误'
                }
            }
        } 
        else {
            ctx.body = {
                code: -1,
                message: '用户名不存在'
            }
        }
    },
    
}
module.exports = operate_api;