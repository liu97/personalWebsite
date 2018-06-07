/**
 * restful contacts子路由
 */
const router = require('koa-router')()
const contactsController = require('./../controllers/contacts')

const routers = router.get('/contacts', contactsController.get_contact)
                      .put('/contacts/:id', contactsController.saw_contact)
                      .del('/contacts/:id', contactsController.delete_contact)
                      .get('/contacts/:id', contactsController.get_contact)
                      
 
module.exports = routers