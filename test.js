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
//  host  : '127.0.0.1',
//  user  : 'root',
//  password : '',
//  database : 'blogs'
// });
// var values = [['js'],['tag']];
// var sql = "insert into tags set tag_name = ?;";
// // var sql = "insert into articles (title,tags,article_path,last_modify_time,type) values ?;"
// let query = connection.query(sql, values, function (err, rows, fields) {
//  if(err){
//     console.log('INSERT ERROR - ', err.message);
//     return;
//    }
//    console.log("INSERT SUCCESS");
// });
// console.log(query.sql)

// values   ? ? ? [1,2,3]
//          ?s    [[[1,2,3]]]
//          ?     [1] or 1

// const fs = require('fs');
// fs.mkdirSync('resources/test/11/2')
// const os = require('os');
// const path = require('path');
// const Koa = require('koa');
// const fs = require('fs');
// const koaBody = require('koa-bodyparser');

// const app = new Koa();

// const main = async function(ctx) {
//   const tmpdir = os.tmpdir();
//   const filePaths = [];
//   const files = ctx.request.body.files || {};

//   for (let key in files) {
//     const file = files[key];
//     const filePath = path.join(tmpdir, file.name);
//     const reader = fs.createReadStream(file.path);
//     const writer = fs.createWriteStream(filePath);
//     reader.pipe(writer);
//     filePaths.push(filePath);
//   }

//   ctx.body = filePaths;
// };

// app.use(koaBody({ multipart: true }));
// app.use(main);
// app.listen(3000);

var Koa = require('koa');
var Router = require('koa-router');
const fs = require('fs');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
//const multiparty = require('multiparty');
//const multer = require('koa-multer');
var app = new Koa();
var router = new Router();
//const upload=multer({desk: './uploads/' });
// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './static')
  ))
  

router
    .post(`/upload`, koaBody({multipart:true}),
    (ctx) => {
        // console.log('----- hello ----');
        console.log(ctx.request.body);
        // console.error('---------------');
        // const writeStream = fs.createWriteStream('./111.jpg');
        // ctx.request.body.files.my_file.pipe(writeStream);
        console.log(ctx.request.body);
    });
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3456);