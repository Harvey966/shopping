// pages/order/order.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    }

  }
})
