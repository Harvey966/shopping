// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "functionName": "callback",
    "envId": "cloud1-8gwbqvbh5c0a5f20",
    "subMchId" : "1615172484",
    "nonceStr": event.nonceStr,
    "body" : event.order.good.title,
    "outTradeNo" : event.outTradeNo,
    "totalFee" : 1,
    "spbillCreateIp" : "123.12.12.123",
    "tradeType":"JSAPI",
    "openid":"oJr0B4-OGI7YQM1U9MUPCt-Nnl5Y"
    
    
  })
  return res
  
}