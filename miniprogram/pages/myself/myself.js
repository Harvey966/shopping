// pages/myself/myself.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    quanbu(){
      const tabId = 'pendingPay';
      wx.navigateTo({
        url: 'plugin-private://wx34345ae5855f892d/pages/orderList/orderList',
      });
    },
    daifukuan(){
      const tabId = 'pendingPay';
      wx.navigateTo({
        url: `plugin-private://wx34345ae5855f892d/pages/orderList/orderList?tabId=${tabId}`,
      });
    },
    daifahuo(){
      const tabId = 'pendingRecevied';
      wx.navigateTo({
        url: `plugin-private://wx34345ae5855f892d/pages/orderList/orderList?tabId=${tabId}`,
      });
    },
    shouhuo(){
      const tabId = 'afterSale';
      wx.navigateTo({
        url: `plugin-private://wx34345ae5855f892d/pages/orderList/orderList?tabId=${tabId}`,
      });
    },
  }
})
