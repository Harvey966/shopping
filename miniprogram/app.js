//app.js

App({
  onLaunch: function () {
   
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'xiaozhe-cloud-5gppj05le73df7a2',
        traceUser: true,
      })
    }
    
    this.globalData = {
      goods:[],
      user:{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        shopcar_List:[],//购物车商品列表
        delivery_address:{},//收货地址
        daifukuan:[],//待付款
        daifahuo:[],//代发货
        yifahuo:[],//已发货
        yiwancheng:[]//已完成
      }
    }
  }
})
