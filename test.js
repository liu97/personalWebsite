// const multer = require('koa-multer');//加载koa-multer模块  
// const Router = require('koa-router');
// const Koa = require("koa");
// const bodyParser = require('koa-bodyparser')
// const koaStatic = require('koa-static')
// const path = require('path');

// const app = new Koa();
// let router = new Router();

// //路由  
// router.get('/',async(ctx)=>{
//     ctx.body="<form method='post' action='/upload' enctype='multipart/form-data'><input type='file' name='filee' /><input type='submit'/></form>"
// })
// //文件上传  
// //配置  
// var storage = multer.diskStorage({  
//   //文件保存路径  
//   destination: 'static/upload_images/2018/',  
//   //修改文件名称  
//   filename: function (req, file, cb) {  
//     var fileFormat = (file.originalname).split(".");  
//     cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
//   }  
// })  
// //加载配置  
// var upload = multer({ storage: storage });  
// router.post('/upload', upload.single('editormd-image-file'), async (ctx, next) => {  
//   ctx.body = {  
//     filename: ctx.req.file.filename //返回文件名  
//   }  
// })  
// // 配置静态资源加载中间件
// app.use(koaStatic(
//     path.join(__dirname , './static')
//   ))
// app.use(bodyParser())
// app.use(router.routes());
// app.listen(3001);
// console.log("port 3001");
// const moment = require('moment');
// const time = require('./server/utils/datetime')
 
// console.log(time.getNowDatetime())

// var mysql = require('mysql');
// // 数据库信息
// var connection = mysql.createConnection({
//  host  : 'localhost',
//  user  : 'root',
//  password : '',
//  database : 'blogs'
// });
// var values = "index1"
 
// ;
// var sql = "update articles set title = ? ;";
// // var sql = "insert into articles (title,tags,article_path,last_modify_time,type) values ?;"
// let query = connection.query(sql, values, function (err, rows, fields) {
//  if(err){
//     console.log('INSERT ERROR - ', err.message);
//     return;
//    }
//    console.log("INSERT SUCCESS");
// });
// console.log(query.sql)

// // values   ? ? ? [1,2,3]
// //          ?s    [[[1,2,3]]]
// //          ?     [1] or 1
