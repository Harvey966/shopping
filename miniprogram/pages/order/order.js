// pages/order/order.js
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
    count:1,
    user:{},
    good:{},
    indexId:0,
    total_money:0,
    beizhu:""
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    onLoad(option){
      
      this.setData({
        good:getApp().globalData.goods[option.index],
        user:getApp().globalData.user,
        indexId:option.index,
        total_money:app.globalData.goods[option.index].now_price
      })
      
    },
    onShow(){
        this.setData({
          user:getApp().globalData.user,
        })
    },
    reduce_count(){
      if(this.data.count>1)
      this.setData({
        count:this.data.count-1,
        total_money:(this.data.count-1)*this.data.good.now_price
      })
    },
    add_count(){
      this.setData({
        count:this.data.count+1,
        total_money:(this.data.count+1)*this.data.good.now_price
      })
    },
    linktoAddress(){
      wx.navigateTo({
        url:"../address/address"
      })
    },
    async clickOrder(){
      wx.showLoading({
        title: '',
      })
      let order={
        address:this.data.user.address,
        good:this.data.good,
        type:0,
        count:this.data.count,
        total_money:this.data.good.now_price*this.data.count,
        beizhu:this.data.beizhu,
        order_time:new Date().format("yyyy-MM-dd hh:mm:ss")
      }

      await db.collection("order").add({
        data:order
      })
      wx.hideLoading()
      wx.navigateTo({
        url: 'pages/orderForm/orderForm',
      })
      // const res = await wx.cloud.callFunction({
      //   name:"callpay",
      //   data:{
      //     order,
      //     outTradeNo,
      //     nonceStr,
      //     openid:app.globalData.user._openid
      //   }
      // })
     
      // const payment = res.result.payment
      // const res2 = await wx.requestPayment({
      //   ...payment
      // }).catch(err=>{
      //   console.log("支付失败",err);
      // })
      // if(res2?.errMsg==="requestPayment:ok"){
      //   console.log("支付成功");
      // }
      // else{
      //   console.log("支付失败");
      // }
    }

  }
})
