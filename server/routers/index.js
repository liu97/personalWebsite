/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const articles = require('./articles');
const apis = require('./apis');
const home = require('./home');
const blogs = require('./blogs');
// const category = require('./category');
// const admin = require('./admin')
// const error = require('./error')

router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/apis', apis.routes(), apis.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/blogs', blogs.routes(), blogs.allowedMethods())
// router.use('/category', category.routes(), category.allowedMethods())
// router.use('/admin', admin.routes(), admin.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router


