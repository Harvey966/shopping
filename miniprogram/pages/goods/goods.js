// pages/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    image:['../../images/index/1.jpg','../../images/index/2.jpg','../../images/index/3.jpg'],
    good:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    linkToOrder(){
      wx.navigateTo({
        url: '../order/order',
      })
    },
    linkToIndex(){
      wx.navigateBack();
    },
    onLoad(option){
      
      this.setData({
        good:getApp().globalData.goods[option.index]
      },res=>{
        console.log(this.data.good);
      })
    }
  },
  
})
