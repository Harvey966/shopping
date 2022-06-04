
//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  
  data:{
    image:['../../images/index/1.jpg','../../images/index/2.jpg','../../images/index/3.jpg'],
    goods:[],
    class_list:[],
    goodsList:[],
    
    // 锚点导航
    activeNum:0, //导航栏选择的位置
    allTop:[],
    scrollTop:0,//滚动的高度

    // 商品弹窗
    showModal:false,
    selectGood:{},

    // 购物袋弹窗
    showBags:false,
    // 购物袋列表弹窗
    showBagsList:false,

    // 自取还是外卖
    ways_index:0,

    onTime:true,
  },
   
  async onLoad(){
    //登陆信息
    this.onLoadLogin()
  },
  async onShow(){
    await this.fetchData()
    this.getBuinessTime()
    this.checkBags()
    this.getAllTop()
  },
  async getBuinessTime(){
    let res=await wx.cloud.callFunction({
        name:"getBuinessTime"
    })
    console.log(res);
    let date = new Date();
    let now = date.getHours() * 100 + date.getMinutes();
    let {start,end}=res.result
    let flag=false
    if(now>=start&&now<=end)flag=true
    await this.setData({
        onTime:flag
    })
    let startH=start/100
    let startM=start%100>10?start%100:'0'+start%100
    let endH=end/100
    let endM=end%100>10?end%100:'0'+end%100
    
    if(!flag){
        wx.showModal({
          title: '店家休息中',
          content:`营业时间：${startH}:${startM} - ${endH}:${endM}`
        })
    }
  },
  async fetchData(){
    let res1 = await wx.cloud.callFunction({
        name:'getClassList'
    })
    let res2 = await wx.cloud.callFunction({
    name:"getAllGoods"
  })
  console.log(res1.result[0]);
  this.setData({
      class_list: res1.result[0].class_list,
      goodsList: res2.result,
  })
  },
  // 检查购物袋是否为空
  checkBags(){
    // 购物袋不为空就展示
    if(app.globalData.user.bags.length!==0){
        if(!this.data.showModal)
        {
            this.setData({
                showBags:true
            })
        }
        else{
            this.setData({
                showBags:false
            })
        }
    }
    else {
        this.setData({
            showBagsList:false,
            showBags:false
        })
    }
  },
  //判断有没有找到这个用户，若没有，则新建它的数据
  async onLoadLogin(){
    let openid="";
    // 登陆
    let loginRed=await wx.cloud.callFunction({
      name:"login"
    })
    openid=loginRed.result.openid;
    let flag=true;
    let user;
    // 根据openid查找是否已经存在
    let userRes=await db.collection("user").where({
      _openid:openid
    }).get()
    if(userRes.data.length===0){
        console.log("没有找到");
        flag=false;
    }
    else{
        user = userRes.data[0]
    }
    const demo = {
        _openid:openid,
        bags:[],//购物车商品列表
        delivery_address:{},//收货地址
        vip:false,
        new:true
    }
    if(!flag){
      app.globalData.user=demo
      wx.cloud.callFunction({
          name:'updateUser',
          data:demo
      })
    }
    else {
      app.globalData.user=user
      this.checkBags()
    }
  },
  // 锚点导航
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
        this.setData({
            allTop:filtRes
        })
      })
   },

   // 滚动时改变锚点导航
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

  // 关闭商品弹窗展示
  hideModal(){
      if(this.data.onTime)return
    this.setData({
        showModal:false,
        showBagsList:false
    },()=>{this.checkBags()})
  },
  // 打开商品弹窗展示
  showModal(e){
    this.setData({
        showModal:true,
        selectGood:e.currentTarget.dataset.good
    },()=>{this.checkBags()})
  },
  openBagsList(){
      this.setData({
        showBagsList:true
      })
  },
  async clickWaysRight(){
      if(this.data.ways_index==0){
          let res=await wx.showModal({
            content: '是否切换到外卖商品？',
          })
          if(res.confirm){
            await this.setData({
                ways_index:1
            })
            wx.showLoading({
                title: '...',
              })
            await this.fetchData()
            wx.hideLoading()
          }
      }
      
  },
  async clickWaysleft(){
    if(this.data.ways_index==1){
        let res=await wx.showModal({
          content: '是否切换到店内自取商品？',
        })
        if(res.confirm){
          await this.setData({
              ways_index:0
          })
          wx.showLoading({
            title: '...',
          })
          await this.fetchData()
          wx.hideLoading()
        }
    }
}
})
