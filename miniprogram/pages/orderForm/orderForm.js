// pages/orderForm/orderForm.js
const app = getApp()
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order:{}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onLoad(option){
      wx.showLoading({
        title: '',
      })
      console.log("option",option);
      let res = await db.collection("order").where({
        _id:"54ad1eea620fa34b1148e5063c364071"
      }).get()
      await this.setData({
        order:res.data[0]
      })
      console.log("订单",res);

      wx.hideLoading()
    }
  }
})
