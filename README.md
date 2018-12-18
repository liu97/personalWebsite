# 个人博客管理系统
前台页面：jquery
后台页面：React + React-Router + Redux
后端：Node.js + Koa2 + MySQL

## 项目初始化
### 1、安装依赖包
> npm install

### 2、初始化数据库
安装MYSQL
创建数据库
> create database blog

配置项目参数config.js
```javascript
const config = {
  // 启动端口
  port: 3000,
  // 数据库配置
  database: {
    DATABASE: 'blog',
    USERNAME: '',
    PASSWORD: '',
    PORT: '3306',
    HOST: 'localhost'
  }
}
module.exports = config
```
### 3、脚本建表
> npm ./init/index.js
## 启动
启动后端服务
> npm run server

启动管理系统服务
> npm run start
