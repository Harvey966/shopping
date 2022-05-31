// pages/orderDetail/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order:{},
        ways:['门店就餐','送餐上门'],
        waysIndex:1,
        goodsList:[],
        total_price:0,
        note:'',
        delivery_address:{},
        id:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id);
        this.fetchData(options.id)
    },
    async fetchData(id){
        let res = await wx.cloud.callFunction({
            name:"getOrder",
            data:{
                id,
            }
        })
        console.log('res.result',res.result);
        this.setData({
            order:res.result,
            goodsList:res.result.goods,
            total_price:res.result.total_price,
            type:res.result.type,
            note:res.result.note,
            delivery_address:res.result.address,
            waysIndex:res.result.ways_index,
            id,
        })
    },
    async cancelOrder(){
        wx.showLoading()
        await wx.cloud.callFunction({
            name:'changeOrder',
            data:{
                type:4,
                id:this.data.id
            }
        })
        await this.fetchData(this.data.id)
        wx.hideLoading()
    },
    async payOrder(){
        // 获取调购买所需要调所有参数
        console.log('this.data.order',this.data.order);
      const res = await wx.cloud.callFunction({
        name:"callpay",
        data:{
          order:this.data.order,
          outTradeNo:this.data.id,
          nonceStr:this.data.id,
          openid:app.globalData.user._openid
        }
      })
      const payment = res.result.payment
      console.log('payment',payment);
      const res2 = await wx.requestPayment({
        ...payment
      }).catch(err=>{
        console.log("支付失败",err);
      })
      if(res2?.errMsg==="requestPayment:ok"){
          let catchRes= await wx.cloud.callFunction({
              name:'getCatchNum'
          })
          let catch_num = catchRes.result
          await wx.cloud.callFunction({
            name:"changeOrder",
            data:{
                type:1,
                catch_num:catch_num,
                id:this.data.id
            }
          })
          await this.fetchData(this.data.id)
          wx.showToast({
            title: '支付成功',
          })
      }
      else{
        wx.showToast({
          title: '支付失败',
          icon:'error'
        })
      }
    }
})