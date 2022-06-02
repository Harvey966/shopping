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
          ...event
        }
      })
    if(event.type==1){
        let {data} = await db.collection('order').doc(event.id).get()
        let message={
            touser:data.userInfo.openId,
            templateId:'soSYRWp6na5sLqtUf9hKiaM_Re_kCDD_m8VDU_i7cCI',
            data:{
                thing2:{value:data.catch_num},
                thing5:{value:data.goods.map(v=>v.title).join(',')}
            },
            lang:'zh_CN',
            page:'pages/myOrderList/myOrderList'
        }
        await cloud.openapi.subscribeMessage.send({
            ...message
        })
    }
    return res
      
}