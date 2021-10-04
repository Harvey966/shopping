// 云函数入口文件
var request = require('request')
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let access_token = event.access_token
  return new Promise((resolve,reject)=>{
    request(
      {
      url:"https://api.weixin.qq.com/product/store/get_info?access_token="+access_token,
      method:"post",
      body:{

      }
    },function(error,response,body){
      if(!error && response.statusCode == 200){
        try {
          resolve(body)
        }
        catch(err){
          reject()
        }
      }
    })
  })
}