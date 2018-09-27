/**
 * restful contacts子路由
 */
const router = require('koa-router')()
const contactsController = require('./../controllers/contacts')

const routers = router.get('/', contactsController.get_contact)
                      .put('/', contactsController.saw_contact)
                      .del('/', contactsController.delete_contact)
                      .put('/:id', contactsController.saw_contact)
                      .del('/:id', contactsController.delete_contact)
                      .get('/:id', contactsController.get_contact)
                      
 
module.exports = routers