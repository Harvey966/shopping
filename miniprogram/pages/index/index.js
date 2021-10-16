
//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  
  data:{
    image:['../../images/index/1.jpg','../../images/index/2.jpg','../../images/index/3.jpg'],
    indicatorDots: true,
    goods:[]

  },
   
  onLoad(){
    //获取商品列表
    db.collection('goods').where({
      status:1
    }).get().then(res=>{
      this.setData({
        goods:res.data
      }),
      app.globalData.goods=res.data
    })
    
    //登陆信息
    this.onLoadLogin()
    
  },
  
  //判断有没有找到这个用户，若没有，则新建它的数据
  async onLoadLogin(){
    let openid="";
    await wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      openid=res.result.openid;
    })
    let flag=true;
    await db.collection("user").where({
      _openid:openid
    }).get().then(res=>{
      if(res.data.length===0){
        console.log("没有找到");
        flag=false;
      }
    })
    const demo = {
        shopcar_List:[],//购物车商品列表
        delivery_address:{},//收货地址
        daifukuan:[],//待付款
        daifahuo:[],//代发货
        yifahuo:[],//已发货
        yiwancheng:[]//已完成
    }
    if(!flag){
      app.globalData.user=demo
      await db.collection("user").add({
        data:demo
      })
    }
    else {
      console.log("找到了");
    }

  },

  clickImg(event){
    console.log(event.currentTarget.dataset.index)//代表点击的第几张图片
    

  },
  linkToType(e){
    const productId = [51699172] // 填写具体的商品Id
    wx.navigateTo({
      
      url: `plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=${productId}`,
    })
  },
  linkToGoods(e){
    
    wx.navigateTo({
      url:"../goods/goods?index="+e.currentTarget.dataset.index
    })
  },
  clickBtn(){
    db.collection("goods").add(
      {
        data:{
          "title": "溜冰鞋滑板车",
          "now_price": 123,
          "old_price": 999,
          "images": ["cloud://cloud1-8gwbqvbh5c0a5f20.636c-cloud1-8gwbqvbh5c0a5f20-1307542532/平衡车.jpg"],
          "count": 999,
          "status": 1,
          "banner": 0
        }
      }

    ).then(res=>{
      console.log(res)
    })
  }
})
