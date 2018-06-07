const contact_model = require('../models/contacts');

let operate_contact = {
    /**
     * 删除联系我
     * @param {Object} ctx 
     */
    async delete_contact(ctx){
        let contact_id = ctx.params.id;
        let result = await contact_model.delete_contacts(contact_id);
        ctx.body = result;
    },
    /**
     * 查询联系我
     * @param {Object} ctx 
     */
    async get_contact(ctx){
        let contacts = [];
        if(Object.keys(ctx.params).length != 0){
            if(ctx.params.id != undefined){
                contacts = await contact_model.get_contact_by_id(ctx.params.id)
            }
        }
        else if(Object.keys(ctx.query).length != 0){
            if(ctx.query.saw != undefined){
                contacts = await contact_model.get_contact_by_saw(ctx.query.saw);
            }
        }
        else{
            contacts = await contact_model.get_all_contact();
        }
        ctx.body = contacts;
    },
    /**
     * 已查看联系我
     * @param {Object} ctx 
     */
    async saw_contact(ctx){
        let body_id = ctx.params.id;
        let contact = await contact_model.get_contact_by_id(body_id);
        contact = contact[0];
        contact.saw = "是";
        let result = await contact_model.update_contact(contact);
    },
}

module.exports = operate_contact;