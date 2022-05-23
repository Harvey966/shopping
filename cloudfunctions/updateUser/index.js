// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
})

// 更新或新增用户信息
exports.main = async (event, context) => {
    if(event.hasOwnProperty('new')){
        const temp = event
        delete temp.new
        await db.collection("user").add({
            data:temp
        })
    }
    else{
        delete event._id
      await db.collection('user').where({
        _openid:event._openid
      }).update({
          data:event
      })
    }
      return {
          event,
          
      }
}