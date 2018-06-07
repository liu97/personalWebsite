/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const articles = require('./articles');
const apis = require('./apis');
const home = require('./home');
// const admin = require('./admin')
// const work = require('./work')
// const error = require('./error')

router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/apis', apis.routes(), apis.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
// router.use('/admin', admin.routes(), admin.allowedMethods())
// router.use('/work', work.routes(), work.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router


