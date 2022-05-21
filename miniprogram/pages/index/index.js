const {class_list,goodsList} =require('./config')

//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  
  data:{
    image:['../../images/index/1.jpg','../../images/index/2.jpg','../../images/index/3.jpg'],
    indicatorDots: true,
    goods:[],
    class_list:class_list || [],
    goodsList,
    activeNum:0, //导航栏选择的位置
    allTop:[],
    scrollTop:0,//滚动的高度
  },
   
  onLoad(){
    //登陆信息
    this.onLoadLogin()
    
  },
  onShow(){
    wx.cloud.callFunction({
      name:"getAllGoods"
    }).then(res=>{
      console.log("全部商品",res);
      this.setData({
        goods:res.result
      })
      app.globalData.goods=res.result
    })
    this.getAllTop()
  },
  //判断有没有找到这个用户，若没有，则新建它的数据
  async onLoadLogin(){
    let openid="";
    await wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      openid=res.result.openid;
      console.log("login数据",res);
    })
    let flag=true;
    let user;
    await db.collection("user").where({
      _openid:openid
    }).get().then(res=>{
      if(res.data.length===0){
        console.log("没有找到");
        flag=false;
      }
      else{
        user = res.data[0]
      }
    })
    const demo = {
        openid:openid,
        shopcar_List:[],//购物车商品列表
        address:{},//收货地址
        vip:false
    }
    if(!flag){
      app.globalData.user=demo
      await db.collection("user").add({
        data:demo
      })
    }
    else {
      app.globalData.user=user
    }
  },
  goAnchor(e){
    const index=e.target.dataset.index
    const id = 'nav-'+index
    console.log(index);
    console.log(this.data.allTop[index]);
    this.setData({
        activeNum:index,
        toView:id,
        scrollTop:this.data.allTop[index]
    })

    
  },
  // 获取所有锚点的top
  getAllTop(){
    new Promise(resolve => {
        let query = wx.createSelectorQuery();
        this.data.class_list.map((value,index)=>{
            const id = '#nav-'+index
           query.select(id).boundingClientRect()
        })
        query.exec((res)=>{
            resolve(res.map((value)=>value.top))
        })
      })
      .then(res => {
          let filtRes = res.map((v)=> v-res[0])
          console.log("所有高度",filtRes);
        this.setData({
            allTop:filtRes
        })
      })
   },

   //滚动时
   scroll(e) {
    let nowNum=e.detail.scrollTop
    let len = this.data.allTop.length
    let resNum=len-1;
    for(let i =0;i<len-1;i++){
        if(nowNum>=this.data.allTop[i]&&nowNum<this.data.allTop[i+1])
            resNum=i;
    }
    this.setData({
        activeNum:resNum
    })
  },
  clickGoods(e){
    
    wx.navigateTo({
      url:"../goods/goods?index="+e.currentTarget.dataset.index
    })
  },
  
})
