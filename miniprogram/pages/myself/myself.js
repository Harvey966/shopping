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
    },
    call(){
        wx.makePhoneCall({
            phoneNumber: '13702687728'
          })
    },
    async setBuinessTime(){
        let res=await wx.showModal({
            title:'设置营业时间',
          editable:true,
          placeholderText:'例如：8:00-18:00'
        })
        if(res.confirm){
            console.log(res.content);
            await wx.cloud.callFunction({
                name:'setBuinessTime',
                data:{
                    time:res.content
                }
            })
        }
    }
  }
})
