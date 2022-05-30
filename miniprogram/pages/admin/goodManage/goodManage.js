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
    dataList:[],
    class_list:[],
    activeNum:0,
    goodsList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onShow(){
      this.getClassList()
      let res=await wx.cloud.callFunction({
          name:'getAllGoods'
      })
      console.log(res.result);
      this.setData({
          goodsList:res.result
      })
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
    addGoods(){
      wx.navigateTo({
        url: '../changeGoods/index?type=1',
      })
    },

    clickGoods(option){
        console.log(option.currentTarget.dataset.good._id);
        wx.navigateTo({
            url: `../changeGoods/index?type=0&id=${option.currentTarget.dataset.good._id}`,
        })
    },

    // 分类的方法
    goAnchor(e){
        const index=e.target.dataset.index
        this.setData({
            activeNum:index,
        })
    },
    upClass(e){
        const index=e.target.dataset.index
        let class_list=JSON.parse(JSON.stringify(this.data.class_list))
        if(index===0)return
        let temp = class_list[index-1]
        class_list[index-1]=class_list[index]
        class_list[index]=temp
        this.changeClassList(class_list)
    },
    async deleteClass(e){
        const index=e.target.dataset.index
        console.log(index);
        let class_list=JSON.parse(JSON.stringify(this.data.class_list))
        let res = await wx.showModal({
            title:'删除操作',
            content:`确认删除 ${class_list[Number(index)].title} ？`
          })
        if (res.confirm) {
            class_list=class_list.slice(0,index).concat(class_list.slice(index+1,class_list.length))
            this.changeClassList(class_list)
        }
       
        
    },
    async addClass(){
        let {content} =await wx.showModal({
          title:'新增分类',
          editable:true,
          placeholderText:"输入分类名称"
        })
        if(!content || content==='')return
        let class_list=this.data.class_list.concat()
        class_list.push({
            class_id:new Date().getTime(),
            title:content
        })
        this.changeClassList(class_list)
    },
    async changeClassList(class_list){
        wx.showLoading({
            title: '',
          })
        await wx.cloud.callFunction({
            name:"changeClassList",
            data:{
                class_list,
            }
        })
        await this.getClassList()
        wx.hideLoading()
    },
  }
})
