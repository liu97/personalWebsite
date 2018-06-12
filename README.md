# personalWebsite
使用jquery + node.js + mysql 搭建的个人博客

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

> npm run start

