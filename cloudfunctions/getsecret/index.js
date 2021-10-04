// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve,reject) =>{
    request(
      {
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5f2a9fed128cac96&secret=d27f66d9c12395e0bd29d8f0d2771bb8',
      method:"get"
  
    },function(error, response, body){
      if(!error && response.statusCode == 200){
        try {
          resolve(body)
        }
        catch(e){
          reject()
        }
      }
    }
    )
  })

  
}