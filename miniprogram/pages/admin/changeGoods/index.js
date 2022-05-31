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
    describe:'',
    price:0,
    images:'',
    class:-1,
    class_list:[],
    attr_detail:[],
    ways:['门店就餐','送餐上门'],
    ways_index:-1
  },

  /**
   * 组件的方法列表
   */
  
  methods: {

    async onLoad(option){
        let goods=await wx.cloud.callFunction({
            name:'getAllGoods'
        })
        console.log("goods",goods);
      console.log("传参",option)
      if(option.type==="1"){
        this.setData({
          type:option.type
        })
      }
      else{
        let res= await db.collection("goods").doc(option.id).get()
        let data = res.data
        console.log("获取的data",res);
        this.setData({
            data,
          type:option.type,
          title:data.title,
          price:data.price,
          describe:data.describe,
          images:data.images,
          class:data.class,
          class_sort_num:data.class_sort_num,
          attr_detail:data.attr_detail,
        })
      }
    },
    changeAttr(e){
        const index = e.target.dataset.index
        const str=e.detail.value
        let attr_detail = JSON.parse(JSON.stringify(this.data.attr_detail))
        attr_detail[index].list = str.split(',')
        this.setData({
            attr_detail,
        })
    },
    deleteAttr(e){
        const index = e.target.dataset.index
        let attr_detail = JSON.parse(JSON.stringify(this.data.attr_detail))
        wx.showModal({
            content:`确定删除属性 ${attr_detail[index].title} ?`
        }).then(res=>{
            if(res.confirm){
                attr_detail=attr_detail.slice(0,index).concat(attr_detail.slice(index+1,attr_detail.length))
                this.setData({
                    attr_detail,
                })
            }
        })
    },
    addAttr(){
        let attr_detail = JSON.parse(JSON.stringify(this.data.attr_detail))
        wx.showModal({
            title: '添加属性',
            editable:true,
            placeholderText:'输入属性的名字'
        }).then(res=>{
            if(res.confirm&&res.content){
                attr_detail.push({
                    title:res.content,
                    list:[]
                })
                this.setData({
                    attr_detail,
                })
            }
        })
    },
    async onShow(option){
        this.getClassList()
    },
    getClassList(){
        wx.showLoading({
            title: '',
          })
          wx.cloud.callFunction({
              name:'getClassList'
          }).then(res=>{
              this.setData({
                class_list:res.result[0].class_list
              })
          })
          wx.hideLoading()
    },
    classChange(e){
        this.setData({
            class:e.detail.value
        })
    },
    waysChange(e){
        this.setData({
            ways_index:e.detail.value
        })
    },
    // 上传新图片
    chooseImage(){
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          
        }).then(res=>{
          
          // tempFilePath可以作为img标签的src属性显示图片
          const paths = res.tempFilePaths
    
          this.upLoadImages(paths);
          
        })
      },
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
      res=res.map(item=>item.fileID)
      this.setData({
        images:res[0]
      })
      wx.hideLoading()
    },
    
    // 增加
    async add(){
      wx.showLoading({
        title: '',
      })
      if(this.data.class==-1 || this.data.title==='' || this.data.price==='' || this.data.images.length===0 || this.data.ways_index===-1){
          wx.showToast({
            title: '数据不完整',
            icon:'error'
          })
          return
      }
      let data={
        title:this.data.title,
        price:this.data.price,
        describe:this.data.describe,
        images:this.data.images,
        class:this.data.class,
        class_sort_num:new Date().getTime(),
        attr_detail:this.data.attr_detail,
        ways_index:this.data.ways_index,
      }
      console.log('data',data);
      let res= await db.collection("goods").add(
        {
          data,
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
      let data={
        title:this.data.title,
        price:this.data.price,
        describe:this.data.describe,
        images:this.data.images,
        class:this.data.class,
        class_sort_num:new Date().getTime(),
        attr_detail:this.data.attr_detail,
      }
      let res= await db.collection("goods").doc(this.data.data._id).update(
        {
          data,
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
