/**
 * restful blogs子路由
 */
const router = require('koa-router')()
const homeController = require('./../controllers/blogs')


module.exports = router.get('/', homeController.get_blogs)
