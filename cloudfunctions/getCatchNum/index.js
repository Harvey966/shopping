// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env: 'cloud1-4goshq4u463ece5f'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    let date = new Date().getDate()
    let id = '6d85a2b96294cff307a9dd5a1786d6a4'
    let res= await db.collection('other').doc(id).get()
    if(res.data.date==date){
        await db.collection('other').doc(id).update({
            data:{
                now_number:res.data.now_number+1
            }
        })
        return res.data.now_number+1
    }
    await db.collection('other').doc(id).update({
        data:{
            date,
            now_number:1
        }
    })
    return 1
    // add({
    //     data:{
    //         now_number:1,
    //         date:30,
    //         type:'catch'
    //     }
    // })
    return res.data
}