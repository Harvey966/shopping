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
    order:{}
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
        order:{
          address:getApp().globalData.user.address,
          good:getApp().globalData.goods[option.index],
          type:0,
          count:1,
          total_money:getApp().globalData.goods[option.index].now_price,

        }
      })
      
    },
    onShow(){
        this.setData({
          user:getApp().globalData.user
        })
    },
    reduce_count(){
      if(this.data.count>1)
      this.setData({
        count:this.data.count-1
      })
    },
    add_count(){
      this.setData({
        count:this.data.count+1
      })
    },
    linktoAddress(){
      wx.navigateTo({
        url:"../address/address"
      })
    },
    async clickOrder(){
      let outTradeNo = Math.random().toString(36).substr(3,10);
      let nonceStr = Math.random().toString(36).substr(3,12);
      await db.collection("order").add({
        data:this.data.order
      })
      
      const res = await wx.cloud.callFunction({
        name:"callpay",
        data:{
          order:this.data.order,
          outTradeNo,
          nonceStr
        }
      })
     
      const payment = res.result.payment
      const res2 = await wx.requestPayment({
        ...payment
      }).catch(err=>{
        console.log("支付失败err");
      })
      if(res2?.errMsg==="requestPayment:ok"){
        console.log("支付成功");
      }
      else{
        console.log("支付失败");
      }
    }

  }
})
