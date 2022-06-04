// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let arr = event.time.split(/[-~]/g);
    let start = arr[0].split(/[:：]/g)[0] * 100 + arr[0].split(/[:：]/g)[1] * 1;
    let end = arr[1].split(/[:：]/g)[0] * 100 + arr[0].split(/[:：]/g)[1] * 1;
    await db.collection('other').where({
        type:'time'
    }).update({
        data:{
            start,
            end,
        }
    })
}