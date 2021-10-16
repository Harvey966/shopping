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
    good:{},
    indexId:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    linkToOrder(){
      wx.navigateTo({
        url: '../order/order?index='+this.data.indexId,

      })
    },
    linkToIndex(){
      wx.navigateBack();
    },
    onLoad(option){
      this.setData({
        good:getApp().globalData.goods[option.index],
        indexId:option.index
      })
    },
    addShopCar(){
      getApp().globalData.user.shopcar_List.unshift(
        {
          good:this.data.good,
          count:1,
          isOn:0
        }
      )
      wx.showToast({
        title: '加入成功'
      })
    }
  },
  
})
