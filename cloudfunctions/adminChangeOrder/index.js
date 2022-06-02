// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    const {id,type} = event
     await db.collection('order').where({
        id,
        type,
    }).update({
        data:{
            type:type+1
        }
    })
    const {data} = await db.collection('order').doc(id).get()
    let message 
    if(data.type==2){
        message={
            touser:data.userInfo.openId,
            templateId:'0sFxicuSgMthqpp59RSYUigE3wEkJ_CUyCVbRmiDRxI',
            data:{
                thing2:{value:'囍cafe'},
                character_string4:{value:data.catch_num},
                thing15:{value:data.goods.map(v=>v.title).join(',')}
            },
            lang:'zh_CN',
            page:'pages/myOrderList/myOrderList'
        }
        await cloud.openapi.subscribeMessage.send({
            ...message
        })
    }
    
    
}