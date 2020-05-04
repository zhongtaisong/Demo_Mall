// 使用express构建web服务器
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./pool');

// 引入路由模块
const index = require('./routes/index.js');
const products = require('./routes/products.js');
const details = require('./routes/details.js');
const users = require('./routes/users.js');
const cart = require('./routes/cart.js');
const comment = require('./routes/comment.js');
const brand = require('./routes/brand.js');
const dictionaries = require('./routes/dictionaries.js');
const order = require('./routes/order.js');
const collection = require('./routes/collection.js');
const address = require('./routes/address.js');
const message = require('./routes/message.js');
const admin = require('./routes/admin.js');

let app = express();

// 白名单
const requestWhiteList = [
  '/api/index/onepush',
  '/api/index/banner',
  '/api/index/hot',
  '/api/products/select',
  '/api/index/kw',
  '/api/users/log',
  '/api/users/vali/forgetPwd',
  '/api/users/update/upwd',
  '/api/users/reg',
  '/api/details/select',
  '/api/cart/select/num',
  '/api/comment/select/pid'
];

// 配置跨域访问
app.use(cors({
	// 指定接收的地址
  origin: [ 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001','http://127.0.0.1:3001',
  'http://172.16.66.37:3000', 'http://192.168.2.102:3000', 'http://192.168.2.101:3000', 'http://192.168.2.100:3000' ],
	// 指定接收的请求类型
	methods: ['GET', 'POST'],
	// 指定header
    alloweHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}))

// 使用body-parser中间件
app.use( bodyParser.json({
  limit: '50mb'
}) );
app.use( bodyParser.urlencoded({
	extended: false,
	limit: '50mb'
}) );

// cookie
app.use( cookieParser() );

// 托管静态资源到public目录下
app.use('/api', express.static('public'));

app.all('/*', (req, res, next) => {
  const { token, type, uname } = req.headers || {};
  const { path, body, query } = req;
  if( type == 'wx' && !requestWhiteList.includes(path) ) {
    if( (query.hasOwnProperty('uname') && !query.uname) || (body.hasOwnProperty('uname') && !body.uname) || !uname ) {
      res.status(401).send({
          code: 401,
          msg: '认证失败，重新登录！'
      })
      return;      
    }
    if( !token ){
        res.status(401).send({
            code: 401,
            msg: '认证token不存在，重新登录！'
        })
        return;
    }
    let sql = "SELECT * FROM dm_user WHERE upwd=? AND uname=?";
    pool.query(sql, [token, uname], (err, data) => {
      if(err){
          res.status(503).send({
              code: 2,
              msg: err
          })
      }else{
          if(!data.length){
            res.status(401).send({
              code: 401,
              msg: '认证token已失效，重新登录！'
            })
            return;
          }
          next();
      }
    });
  }else{
    next();
  }
})

// 使用路由器来管理路由
app.use('/api/index', index);
app.use('/api/products', products);
app.use('/api/details', details);
app.use('/api/users', users);
app.use('/api/cart', cart);
app.use('/api/comment', comment);
app.use('/api/brand', brand);
app.use('/api/dic', dictionaries);
app.use('/api/order', order);
app.use('/api/collection', collection);
app.use('/api/address', address);
app.use('/api/message', message);
app.use('/api/admin', admin);

app.listen(8000, () =>{
	console.log('服务器创建成功！！！');
});