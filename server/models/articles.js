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
        let sql = "insert into articles (title,tags,article_path,img_path,praise,upload_time,last_modify_time,type) values ?;";
        
        let result = await dbu.query(sql,[[[obj.title,obj.tags,obj.article_path,obj.img_path,obj.praise,obj.upload_time,obj.last_modify_time,obj.type]]]);
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
        let sql = `update articles set title = ?, tags = ?, article_path = ?, img_path = ?, praise = ?, upload_time = ?, last_modify_time = ?, type= ? where article_id = ?;`;
        let result = await dbu.query(sql,[obj.title,obj.tags,obj.article_path,obj.img_path,obj.praise,obj.upload_time,obj.last_modify_time,obj.type,obj.article_id]);
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
     * 根据limit查询文章
     * @param {int} start 
     * @param {int} length 
     */
    async get_article_by_limit(start,length){
        let sql = "select * from articles limit ?, ?;";
        let result = await dbu.query(sql,[start,length]);
        return result;
    },
    async get_article_by_tag_limit(tag_name, start, length){
        let sql = `select articles.* 
                from articles,tag_to_article,tags 
                where ? = tags.tag_name and tags.tag_id = tag_to_article.tag_id and tag_to_article.article_id = articles.article_id 
                limit ?, ?;`;
        let result = await dbu.query(sql,[tag_name,start,length]);
        return result;
    },
    /**
     * 获取最新length个文章
     * @param {int} length 
     */
    async get_article_by_desc(length){
        let sql = "select * from articles order by article_id desc limit ?;";
        let result = await dbu.query(sql,[length]);
        return result;
    },
    /**
     * 获取所有文章
     */
    async get_all_article(){
        let sql = "select * from articles";
        let result = await dbu.query(sql);
        return result;
    },
    async get_article_count(){
        let sql = "select count(*) as count from articles;";
        let result = await dbu.query(sql);
        return result;
    },
    async get_article_count_by_tag(tag_name){
        let sql = `select count(*) as count 
        from articles,tag_to_article,tags 
        where ? = tags.tag_name and tags.tag_id = tag_to_article.tag_id and tag_to_article.article_id = articles.article_id;`;
        let result = await dbu.query(sql,[tag_name]);
        return result;
    }
    
};

module.exports = article;