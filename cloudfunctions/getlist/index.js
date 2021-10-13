// 云函数入口文件
var request = require('request')
const cloud = require('wx-server-sdk')
var rp = require("request-promise")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const options = {
    method:"post",
    uri:"https://api.weixin.qq.com/product/spu/get?access_token="+event.access_token,
    headers:{
      'Content-Type': 'application/json'
    },
    json:true,
    body:JSON.stringify({
      "keyword": "测试",
      "source": 1,
      "page": 1,
      "page_size": 10
    })
  }
  return rp(options)

  return new Promise((resolve,reject)=>{
    request(
      {
      url:"https://api.weixin.qq.com/product/spu/get_list?access_token="+access_token,
      method:"post",
    
      data:{
        "status": {
          "value":5
        },
        "page": {
          "value":1
        },
        "page_size":{
          "value":10
        },
        "need_edit_spu":{
          "value":0
        },
        
      }
    },function(error,response,body){
      if(!error && response.statusCode == 200){
        try {
          resolve(body)
        }
        catch(err){
          reject(err)
        }
      }
    })
  })
}