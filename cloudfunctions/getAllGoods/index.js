// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    let classRes = await db.collection('other').where({
        type:'class'
    }).get()
    let {class_list} = classRes.data[0]
    console.log('class_list',class_list);
    Promise.all()
    let result=await Promise.all(class_list.map((v,index)=>{
        return db.collection('goods').where({
            class:String(index)
        }).get()
    }))
    
    return result.map(v=>v.data)
      
}