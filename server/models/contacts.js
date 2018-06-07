const dbu = require('../utils/db-util');

const contacts = { 
    /**
     * 增加联系我
     * @param {Object} obj 
     */
    async insert_contacts(obj){
        let sql = "insert into contacts (name,email,message,time,saw) values ?;"
        let result = await dbu.query(sql,[[[obj.name,obj.email,obj.message,obj.time,obj.saw]]])
        return result;
    },
    /**
     * 删除联系我
     * @param {int} id 
     */
    async delete_contacts(id){
        let sql = "delete from contacts where contact_id = ?;";
        let result = await dbu.query(sql,[id])
        return result;
    },
    /**
     * 更新联系我
     * @param {Object} obj 
     */
    async update_contacts(obj){
        let sql ="update contacts set name = ?, email = ?, message = ?, time = ?, saw = ?;"
        let result = await dbu.query(sql,[obj.name,obj.email,obj.message,obj.time,obj.saw]);
        return result;
    },
    /**
     * 根据id查询联系我
     * @param {int} id 
     */
    async get_contact_by_id(id){
        let sql = "select * from contacts where contact_id = ?;";
        let result = await dbu.query(sql,[id])
        return result;
    },
    /**
     * 根据是否已查看查找联系我
     * @param {String} saw 
     */
    async get_contact_by_saw(saw){
        let sql ="select * from contacts where saw = ?;";
        let result = await dbu.query(sql,[saw]);
        return result;
    },
    async get_all_contact(){
        let sql ="select * from contacts;";
        let result = await dbu.query(sql);
        return result;
    }
}

module.exports = contacts;