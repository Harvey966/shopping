// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    let res= await db.collection('order').doc(event.id).update({
        data:{
          type:event.type
        }
      })
    return res
      
}