// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-8gwbqvbh5c0a5f20"
})

// 云函数入口函数
exports.main = async (event, context) => {
  
  
  return "测试云函数"
}