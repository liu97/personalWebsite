const dbu = require('../utils/db-util');
/**
 * 文章业务操作
 */
/**
 * sql与result的对应情况
 * values   ? ? ? [1,2,3]
 *          (?)   [[[1,2,3]]] 
 *          ?     [1] or 1 
 */
let article = {
    /**
     * 插入新的文章
     * @param {Object} obj 
     */
    async insert_article(obj){
        let sql = "insert into articles (title,tags,article_path,praise,upload_time,last_modify_time,type) values ?;";
        
        let result = await dbu.query(sql,[[[obj.title,obj.tags,obj.article_path,obj.praise,obj.upload_time,obj.last_modify_time,obj.type]]]);
        return result;
    },
    /**
     * 根据id删除文章
     * @param {int} id 
     */
    async delete_article(id){
        let sql = "delete from articles where article_id = ?;";
        let result = await dbu.query(sql,[id]);
        return result;
    },
    /**
     * 更新文章
     * @param {Object} obj 
     */
    async update_article(obj){
        // 一个搞了我两个小时的小bug，sql语句中where后变量只能直接写进(当时的心情留在这里，bug找出来了，sql预处理的问题)
        let sql = `update articles set title = ?, tags = ?, article_path = ?, praise = ?, upload_time = ?, last_modify_time = ?, type= ? where article_id = ?;`;
        let result = await dbu.query(sql,[obj.title,obj.tags,obj.article_path,obj.praise,obj.upload_time,obj.last_modify_time,obj.type,obj.article_id]);
        return result;
    },
    /**
     * 通过文章id查找文章
     * @param {int} id 文章id 
     */
    async get_article_by_id(id){
        let sql = "select * from articles where article_id = ?;";
        let result = await dbu.query(sql,[id]);
        return result;
    },
    /**
     * 根据文章类型查找文章
     * @param {String} type 
     */
    async get_article_by_type(type){
        let sql = "select * from articles where type = ?;";
        let result = await dbu.query(sql,[type]);
        return result;
    },
    /**
     * 获取所有文章
     */
    async get_all_article(){
        let sql = "select * from articles";
        let result = await dbu.query(sql);
        return result;
    }
    
};

module.exports = article;