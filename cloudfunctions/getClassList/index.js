// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
})

// 获取分类列表
exports.main = async (event, context) => {
    let res=await db.collection('other').where({
        type:'class'
    }).get()
    return res.data
}