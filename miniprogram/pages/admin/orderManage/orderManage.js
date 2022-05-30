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
    type:0,
    mapType:["待付款","待发货","待收货","已完成"],
    dataList:[],
    id:"",
    isMask:false,
    radioValue:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    onLoad(){
      this.fetchData(0)
    },
    changeType(event){
      console.log(event.target.dataset.index,typeof event.target.dataset.index);
      this.setData({
        type:event.target.dataset.index
      })
      this.fetchData(event.target.dataset.index)
    },
    async fetchData(type){
      wx.showLoading({
        title: '',
      })
      let res = await wx.cloud.callFunction({
        name:"getOrder",
        data:{
          type
        }
      })
      let data = res.result.concat().reverse()
      await this.setData({
        dataList:data
      })
      wx.hideLoading()
    },
    // 点击修改订单状态
    async changeOrderType(event){
      const {id} =event.target.dataset
      console.log(id);
      this.setData({
        id,
        isMask:true
      })
      
    },
    // 修改
    async changeRadio(e){
      console.log("修改的值",e.detail.value);
      await this.setData({
        radioValue:e.detail.value
      })
    },
    // 隐藏遮罩层
    clickMask(){
      this.setData({
        isMask:false
      })
    },
    // 确认修改
    async confirmType(){
      wx.showLoading({
        title: '',
      })
      await wx.cloud.callFunction({
        name:"changeOrder",
        data:{
          id:this.data.id,
          type:Number(this.data.radioValue)
        }
      })
      wx.hideLoading()
      await this.setData({
        isMask:false
      })
      wx.showToast({
        title: '修改成功',
      })
      this.fetchData(this.data.type)
    }
    
  }
})
