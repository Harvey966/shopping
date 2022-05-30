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
    ways:['门店就餐','送餐上门'],
    waysIndex:0,
    goodsList:[],
    totalPrice:66,
    note:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    onLoad(option){
      
        let bags = option.bags.split(',')
        console.log(option);
        let res = bags.map(v=>app.globalData.user.bags[v])
        console.log(res);
        this.setData({
            goodsList:res
        })
    },
    onShow(){
        this.setData({
            note:app.globalData.note
        })
    },
    navToNote(){
        wx.navigateTo({
          url: "../note/index",
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

      let newOrder=await db.collection("order").add({
        data:order
      })
      wx.hideLoading()

      // 获取调购买所需要调所有参数
      const res = await wx.cloud.callFunction({
        name:"callpay",
        data:{
          order,
          outTradeNo:newOrder._id,
          nonceStr:newOrder._id,
          openid:app.globalData.user._openid
        }
      })
      const payment = res.result.payment
      const res2 = await wx.requestPayment({
        ...payment
      }).catch(err=>{
        console.log("支付失败",err);
      })
      if(res2?.errMsg==="requestPayment:ok"){
        await db.collection("order").doc(newOrder._id).update({
          data:{
            type:1
          }
        })
      }
      else{
        console.log("支付失败");
      }
      wx.navigateTo({
        url: `../orderForm/orderForm?id=${newOrder._id}`,
      })
    }

  }
})
