// pages/myOrderList/myOrderList.js
const app = getApp()
const db = wx.cloud.database()
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
    type:0,
    mapType:["待付款","待发货","待收货","已完成"],
    dataList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.fetchData(0)
    },
    changeType(event){
      this.setData({
        type:event.target.dataset.index
      })
      this.fetchData(event.target.dataset.index)
    },
    async fetchData(type){
      wx.showLoading({
        title: '',
      })
      let res=await db.collection("order").where({
        type,
        _openid:app.globalData.user._openid
      }).get()
      let data = res.data.concat().reverse()
      await this.setData({
        dataList:data
      })
      wx.hideLoading()
    },
    async toOrderForm(option){
      wx.navigateTo({
        url: `../orderForm/orderForm?id=${option.target.dataset.id}`,
      })
    }
  }
})
