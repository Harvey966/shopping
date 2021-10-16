// pages/address/address.js

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
    address:{},
    name:"",
    phone_number:"",
    pro:"",
    detail:"",
    youzheng:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      console.log(getApp().globalData.user);
      this.setData({
        address:getApp().globalData.user.address
      })
      
    },
    saveBtn(){
      
      getApp().globalData.user.address = {
        name:this.data.name,
        phone_number:this.data.phone_number,
        pro:this.data.pro,
        detail:this.data.detail,
        youzheng:this.data.youzheng,
        address_detail:this.data.pro+this.data.detail
      }
      console.log(getApp().globalData.user.address);
      this.updateUser()
    },
    async updateUser(){
      await db.collection("user").where({
        openid1:getApp().globalData.user.openid
      }).update({
        data:{
          address:getApp().globalData.user.address
        }
      })
      wx.showToast({
        title: '保存成功',
      })
      wx.navigateBack()
    }
  }
})
