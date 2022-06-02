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
    typeIndex:0,
    type:0,
    mapType:["当前订单","历史订单"],
    statusMap:['待支付','备餐中','请取餐','已完成','已关闭'],
    waysIndex:1,
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
        typeIndex:event.target.dataset.index
      })
      this.fetchData(event.target.dataset.index)
    },
    async fetchData(typeIndex){
      wx.showLoading({
        title: '',
      })
      let res =await wx.cloud.callFunction({
          name:"getOrder",
          data:{
              type:typeIndex,
          }
      })
      let data = res.result.concat().reverse()
      console.log("获取的数据",data);
      await this.setData({
        dataList:data
      })
      wx.hideLoading()
    },
    async clickOrder(option){
        console.log('option',option);
      wx.navigateTo({
        url: `../orderDetail/index?id=${option.currentTarget.dataset.id}`,
      })
    }
  }
})
