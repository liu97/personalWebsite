/**
 * restful articles子路由
 */

const router = require('koa-router')()
const articlesController = require('./../controllers/articles')
const uploadImg = require('../utils/upload')
/**
 * uploadImg.single('')中参数应该与前端input的name相同，终于做出来了，想哭
 */
const routers = router.post('/', uploadImg.single('article_cover'), articlesController.insert_article)
                      .get('/', articlesController.get_article)
                      .post('/uploadImg', uploadImg.single('editormd-image-file'), articlesController.upload_img)
                      .get('/:id', articlesController.get_article)
                      .del('/:id', articlesController.delete_article)
                      .put('/:id', uploadImg.single('article_cover'), articlesController.update_article)
                      
 
module.exports = routers