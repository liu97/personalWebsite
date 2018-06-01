const dbu = require('../utils/db-util');

let tag = {
    async insert_tag(tag_name){
        let sql = "insert into tags set tag_name = ?";
        let result = dbu.query(sql,[tag_name]);
        return result;
    },
    async delete_tag(name){
        let sql = "delete from tags where tag_name = ?";
        let result = dbu.query(sql,[name]);
        return result;
    },
    async get_tag_by_name(name){
        let sql = "select * from tags where tag_name = ?";
        let result = dbu.query(sql,[name]);
        return result;
    },
    async get_all_tags(){
        let sql = "select * from tags";
        let result = dbu.query(sql,[]);
        return result;
    }
}
module.exports = tag;