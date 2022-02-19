
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
      console.log("login数据",res);
    })
    let flag=true;
    let user;
    await db.collection("user").where({
      _openid:openid
    }).get().then(res=>{
      if(res.data.length===0){
        console.log("没有找到");
        flag=false;
      }
      else{
        user = res.data[0]
      }
    })
    const demo = {
        openid:openid,
        shopcar_List:[],//购物车商品列表
        address:{},//收货地址
        vip:false
    }
    if(!flag){
      app.globalData.user=demo
      await db.collection("user").add({
        data:demo
      })
    }
    else {
      app.globalData.user=user

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
  
})
