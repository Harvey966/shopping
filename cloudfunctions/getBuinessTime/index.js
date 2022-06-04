// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let res=await db.collection('other').where({
        type:'time'
    }).get()
    let {start,end}=res.data[0]
    return {start,end}
}