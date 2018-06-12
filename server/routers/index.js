/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const articles = require('./articles');
const apis = require('./apis');
const home = require('./home');
const blogs = require('./blogs');
const category = require('./category');
const article = require('./article')
// const error = require('./error')
router.get('/', async(ctx)=>{
    ctx.redirect('/home');
})
router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/apis', apis.routes(), apis.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/blogs', blogs.routes(), blogs.allowedMethods())
router.use('/category', category.routes(), blogs.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
// router.use('/admin', admin.routes(), admin.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())

module.exports = router


