// miniprogram/pages/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcar_List:[
      {
        good:{
          title:"平衡车123123",
          now_price:122,
          main_image:["../../images/order/平衡车.jpg"]
        },
        count:1,
        total_money:122,
        isOn:0
      },
      {
        good:{
          title:"平衡车1手机壳3",
          now_price:122,
          main_image:["../../images/order/平衡车.jpg"]
        },
        count:1,
        total_money:122,
        isOn:0
      },
    ],
    img_url1:'../../images/shopcar/选择框_默认.png',
    img_url2:'../../images/shopcar/选择框_选中.png',
    isOn:0,
    total_money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
    
  },
  clickSelectAll(){
    const list = this.data.shopcar_List;
    if(this.data.isOn){
      for(const v of list){
        v.isOn=0;
      }
      this.setData({
        shopcar_List:list,
        isOn:0
      },()=>{
        this.updateMoney()
      })
    }
    else{
      for(const v of list){
        v.isOn=1;
      }
      this.setData({
        shopcar_List:list,
        isOn:1
      },()=>{
        this.updateMoney()
      })
    }
  },
  clickSelect(option){
    let index = option.currentTarget.dataset.index;
    const list = this.data.shopcar_List;
    if(list[index].isOn===0){
      
      list[index].isOn=1;
      this.setData({
        shopcar_List:list
      },()=>{
        this.updateMoney()
      })
      
    }
    else {

      list[index].isOn=0;
      this.setData({
        shopcar_List:list
      },()=>{
        this.updateMoney()
      })
    }


  },
  deleteItem(option){
    let index = option.currentTarget.dataset.index;
    const list = this.data.shopcar_List;
    const list2 = list.slice(0,index).concat(list.slice(index+1,list.length))
    this.setData({
      shopcar_List:list2
    },()=>{
      this.updateMoney()
    })
  },
  add_count(option){
    let index = option.currentTarget.dataset.index;
    const list = this.data.shopcar_List;
    list[index].count++;
    this.setData({
      shopcar_List:list
    },()=>{
      this.updateMoney()
    })
  },
  reduce_count(option){
    let index = option.currentTarget.dataset.index;
    const list = this.data.shopcar_List;
    if(list[index].count>1)
    list[index].count--;
    this.setData({
      shopcar_List:list
    },()=>{
      this.updateMoney()
    })
  },       
  updateMoney(){
    let all = 0;
    for(const v of this.data.shopcar_List){
      if(v.isOn)
      all+=v.good.now_price*v.count
    }
    this.setData({
      total_money:all
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})