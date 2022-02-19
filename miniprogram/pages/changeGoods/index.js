// pages/changeGoods/index.js
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
    data:{},
    title:"",
    now_price:0,
    images:[],
    count:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onLoad(option){
      console.log("传参",option)
      if(option.type==="1"){
        this.setData({
          type:option.type
        })
      }
      else{
        let res= await db.collection("goods").where({
          _id:option.id
        }).get()
        let data = res.data[0]
        console.log("获取的data",data);
        this.setData({
          type:option.type,
          data,
          title:data.title,
          images:data.images,
          now_price:data.now_price,
          count:data.count
        })
      }
    },
    chooseImage(){
      wx.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        
      }).then(res=>{
        
        // tempFilePath可以作为img标签的src属性显示图片
        const paths = res.tempFilePaths
  
        this.upLoadImages(paths);
        
      })
    },
    // 上传新图片
    async upLoadImages(tempFilePaths){
      wx.showLoading({
        title: '',
      })
      let res=await Promise.all(tempFilePaths.map((item)=>{
        return wx.cloud.uploadFile({
          cloudPath: new Date().getTime().toString()+'.png', // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
        })
      }))
      console.log("上传的结果",res);
      res=res.map(item=>item.fileID)
      this.setData({
        images:res
      })
      wx.hideLoading()
    },
    async add(){
      wx.showLoading({
        title: '',
      })
      let res= await db.collection("goods").add(
        {
          data:{
            title:this.data.title,
            now_price:this.data.now_price,
            "old_price": 999,
            images:this.data.images,
            "count": 999,
            "status": 1,
            "banner": 0
          }
        }
      )
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
      })
      wx.navigateBack()
    },
    async delete(){
      wx.showLoading({
        title: '',
      })
      let res=await db.collection("goods").where({
        _id:this.data.data._id
      }).remove()

      wx.hideLoading()
      wx.showToast({
        title: '删除成功',
      })
      wx.navigateBack()
    },
    async change(){
      wx.showLoading({
        title: '',
      })
      let res= await db.collection("goods").doc(this.data.data._id).update(
        {
          data:{
            title:this.data.title,
            now_price:this.data.now_price,
            "old_price": 999,
            images:this.data.images,
            "count": 999,
            "status": 1,
            "banner": 0
          }
        }
      )
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
      })
      wx.navigateBack()
    },
  }
})
