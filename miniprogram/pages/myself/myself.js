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
    vip:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow(){
      this.setData({
        vip:app.globalData.user.vip
      },()=>{
        console.log("是否是VIP",this.data.vip);
      })
    },
    changeAddress(){
      wx.navigateTo({
        url: '../address/address',
      })
    },
    toGoodManage(){
      wx.navigateTo({
        url: '../admin/goodManage/goodManage',
      })
    },
    toOrderManage(){
      wx.navigateTo({
        url: '../admin/orderManage/orderManage',
      })
    }
  }
})
