// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let res;
    if(event.hasOwnProperty('id')){
        res= await db.collection('order').doc(event.id).get()
    }
    // 当前订单
    else if(event.type===0){
        res=  await db.collection('order')
        .where({
          type:_.lt(3),
          userInfo:{
              openId:cloud.getWXContext().OPENID
          }
        })
        .get()
    }
    // 历史订单
    else {
        res = await db.collection('order')
        .where({
          type:_.gt(2),
          userInfo:{
            openId:cloud.getWXContext().OPENID
        }
        })
        .get()      
    }
    return res.data
}