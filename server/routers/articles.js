/**
 * restful articles子路由
 */

const router = require('koa-router')()
const articlesController = require('./../controllers/articles')

const routers = router.get('/aboutMe', articlesController.get_aboutMe)

 
  
module.exports = routers