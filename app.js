const Koa = require('koa')
const app = new Koa()

const router = require('./router/router')
const bodyparser = require('koa-bodyparser')
// 解决跨域 
const zhoux = require('koa2-cors')
app.use(zhoux()); 

app.use(bodyparser())
// 参数 校验
const parameter = require('koa-parameter')
app.use(parameter(app))
// 链接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/zcmax',{useNewUrlParser: true})
.then(()=>{
  console.log('mongodb zcmax start')
})
.catch((err)=>{
  console.log(err)
})
// 挂载总路由
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(4000,()=>{
  console.log('4000 start')
})