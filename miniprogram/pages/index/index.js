
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

    db.collection('goods').where({
      status:1
    }).get().then(res=>{
      this.setData({
        goods:res.data
      }),
      app.globalData.goods=res.data
    })
    
    
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
  }
})
