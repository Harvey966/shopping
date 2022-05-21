// pages/goodManage/goodManage.js
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
    dataList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow(){
      wx.showLoading({
        title: '',
      })
      wx.cloud.callFunction({
        name:"getAllGoods"
      }).then(res=>{
        this.setData({
          dataList:res.result
        })
      })
      wx.hideLoading()
    },
    addGoods(){
      wx.navigateTo({
        url: '../changeGoods/index?type=1',
      })
    },
    changeGoods(option){
      wx.navigateTo({
        url: `../changeGoods/index?type=0&id=${option.target.dataset.id}`,
      })
    }
  }
})
