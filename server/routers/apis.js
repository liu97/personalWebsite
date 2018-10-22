/**
 * restful api子路由
 */
const router = require('koa-router')()
const apisController = require('./../controllers/apis')

const routers = router.post('/contacts', apisController.contact_me)
                      .get('/login', apisController.login)
                      .post('/articles/like', apisController.like)
                                            
 
module.exports = routers