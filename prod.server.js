const express = require('express')

const app = express()

const router = express.Router()

router.get('/', (req, res, next) => {
    req.url = '/index.html'
    next()
})

app.use(router)

// json数据
const goods = require('./data/01-商品页(点菜).json')
const rating = require('./data/02-商品页(评价).json')
const seller = require('./data/03-商品页(商家).json')

// 路由
const routes = express.Router()

// 跨域配置
routes.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

// 接口api
routes.get('/goods', (_, res) => {
    res.json(goods)
})

routes.get('/rating', (_, res) => {
    res.json(rating)
})

routes.get('/seller', (_, res) => {
    res.json(seller)
})

// 中间件
app.use('/api', routes)

// 定义static目录,指向./dist目录
app.use(express.static('./dist'))

// 启动express
module.express = app.listen(8000, err => {
    if (err) {
        console.log(err)
        return
    }
    console.log('server启动完成')
})
