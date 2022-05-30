// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
})

// 修改分类列表
exports.main = async (event, context) => {
    let res=await db.collection('other').where({
        type:'class'
    }).update({
        data:{
            type:'class',
            class_list:event.class_list
        }
    })
    return res
}