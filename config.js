const config = {

  port: 3000,

  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: '',
    PORT: '3306',
    HOST: '127.0.0.1'
  },

  secret: 'jwtlogin',

  root: __dirname
}

module.exports = config