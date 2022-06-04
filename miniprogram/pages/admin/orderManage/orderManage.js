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
    mapType:["堂食","外卖","派送中","请取餐",'已完成'],
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
          name:"adminGetOrder",
          data:{
            typeIndex:typeIndex,
          }
      })
      let data
      if(typeIndex==4)
      data=res.result.concat().reverse()
      else{
        data=res.result
        this.sortData(data)
      }
      console.log("获取的数据",data);
      
      await this.setData({
        dataList:data
      })
      wx.hideLoading()
    },
    // 对data根据付款时间进行排序
    sortData(data){
        data.forEach((v) => {
            v.pay_time = new Date(v.pay_time).getTime();
          });
          console.log(data);
          data.sort((a, b) => {
            return a.pay_time - b.pay_time;
          });
          data.forEach((v) => {
            v.pay_time = new Date(v.pay_time).format("yyyy-MM-dd hh:mm:ss");
          });
    },
    async clickOrder(option){
        console.log('option',option);
      wx.navigateTo({
        url: `../../orderDetail/index?id=${option.currentTarget.dataset.id}`,
      })
    },
    async changeOrder(option){
        const {id,type} = option.currentTarget.dataset
        let res=await wx.showModal({
          title:"修改操作",
          content:'确认修改吗'
        })
        if(res.confirm){
            console.log("确认修改");
            wx.showLoading()
            let adminRes=await wx.cloud.callFunction({
                name:'adminChangeOrder',
                data:{
                    id,
                    type,
                }
            })
            console.log('adminRes',adminRes);
            await this.fetchData(this.data.typeIndex)

            wx.hideLoading()
        }
        
    }
  }
})
