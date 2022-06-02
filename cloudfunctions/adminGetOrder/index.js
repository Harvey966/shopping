// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    const {typeIndex} =event
    let data
    if(typeIndex==0){
        data={
            type:1,
            ways_index:'0'
        }
    }
    else if(typeIndex==1){
        data={
            type:1,
            ways_index:'1'
        }
    }
    else if(typeIndex==2){
        data={
            type:2,
            ways_index:'1'
        }
    }else if(typeIndex==3){
        data={
            type:2,
            ways_index:'0'
        }
    }
    else{
        data={
            type:3,
        }
    }
    let res= await db.collection('order').where({
        ...data
    }).get()
    return res.data
}