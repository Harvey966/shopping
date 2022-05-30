// pages/address/address.js

const db = wx.cloud.database()
const app = getApp()
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
    address:'',
    name:"",
    phone:"",
    detail:"",
    address_name:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(){
      this.setData(getApp().globalData.user.delivery_address)
    },
    async saveBtn(){
      
      getApp().globalData.user.delivery_address = {
        name:this.data.name,
        phone:this.data.phone,
        detail:this.data.detail,
        address:this.data.address,
        address_name:this.data.address_name,
      }
      console.log(getApp().globalData.user);
      await wx.cloud.callFunction({
          name:'updateUser',
          data:app.globalData.user
      })
      wx.showToast({
        title: '保存成功',
      })
      wx.navigateBack()
    },
    select(){
        wx.chooseLocation().then(res=>{
            console.log(res);
            this.setData({
                address:res.address,
                address_name:res.name
            })
        })
    }
  }
})
