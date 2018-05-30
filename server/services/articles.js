const {query} = require('../../init/util/db');
/**
 * 文章业务操作
 */
let article = {
    /**
     * 通过文章id查找文章
     * @param {int} id 文章id 
     */
    async get_article_by_id(id){
        let sql = `select * from articles`;
        let result = await query(sql);
        console.log(result[0]);
        return result[0];
    }
};

module.exports = article;