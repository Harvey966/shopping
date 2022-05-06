// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-4goshq4u463ece5f"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "functionName": "callback",
    "envId": "cloud1-8gwbqvbh5c0a5f20",
    "subMchId" : "1625307450",
    "nonceStr": event.nonceStr,
    "body" : event.order.good.title,
    "outTradeNo" : event.outTradeNo,
    "totalFee" : event.order.total_money*100,
    "spbillCreateIp" : "192.168.1.1",
    "tradeType":"JSAPI",
    "openid":event.openid
  })
  return res
  
}