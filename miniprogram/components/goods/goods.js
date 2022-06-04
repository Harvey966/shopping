// pages/goods/goods.js

const app = getApp()
Component({
  properties: {
    good:{
        type:Object
    },
    ways_index:{
        type:Number
    }
  },

  data: {
    count:1
  },
  methods: {
    close(){
        this.triggerEvent('hideModal')
    },
    addShopCar(e){
      let shorthand = Object.values(e.detail.value).join()
      const bag={
          price:this.properties.good.price,
          title:this.properties.good.title,
          images:this.properties.good.images,
          shorthand,
          count:this.data.count,
          checked:1,
          ways_index:this.properties.ways_index
      }
      // 全局加购物袋商品
      app.globalData.user.bags.push(bag)
      this.triggerEvent('hideModal')
      wx.cloud.callFunction({
        name:'updateUser',
        data:app.globalData.user
    })
    },
    addCount(){
        let count=this.data.count+1;
        this.setData({
            count,
        })
    },
    reduceCount(){
        let count=this.data.count-1;
        if(count<1)count=1
        this.setData({
            count,
        })
    }
  },
  
})
