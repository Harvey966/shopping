// components/shoppingBag/shoppingBag.js
const globalData = getApp().globalData
Component({
    properties: {
        showBagsList:{
            type:Boolean,
            default:false,
            observer(newVal){
                this.setData({
                    showBags:newVal
                })
            }
        }
    },
    
    data: {
        bags:[],
        totalMoney:0,
        showBags:false,
        allSelected:true
    },
    ready(){
        let bags=globalData.user.bags;
        this.setData({
            bags,
        })
        this.calculatePrice()
    },
    methods: {
        // 计算总价格
        calculatePrice(){
            let sum=0;
            let bags=globalData.user.bags;
            bags.forEach((v)=>{
                sum+=v.price*v.count
            })
            this.setData({
                totalMoney:sum
            })
        },
        addOrder(e){
            wx.navigateTo({
              url: `../../pages/summitOrder/index?bags=${e.detail.value.checkbox}`,
            })
        },
        showList(){
            this.triggerEvent('openBagsList')
        },
        reduceCount(e){
            let index = e.target.dataset.index
            let newBags = this.data.bags.concat()
            newBags[index].count--;
            if(newBags[index].count<1)
                newBags=newBags.slice(0,index).concat(newBags.slice(index+1,newBags.length))
            this.undataBags(newBags)
        },
        addCount(e){
            let index = e.target.dataset.index
            let newBags = this.data.bags.concat()
            newBags[index].count++;
            this.undataBags(newBags)
        },
        undataBags(newBags){
            globalData.user.bags=newBags
            this.setData({
                bags:newBags
            },()=>{
                this.calculatePrice()
            })
            this.triggerEvent('checkBags')
            wx.cloud.callFunction({
                name:'updateUser',
                data:globalData.user
            })
        },
        clear(){
            this.undataBags([])
        },
        checkboxChange(e){
            let res=true
            if(e.detail.value.length!==this.data.bags.length){
                res=false
            }
            this.setData({
                allSelected:res
            })  
        },
        changeAll(e){
            let newBags = this.data.bags.concat()
            if(e.detail.value.length===1){
                newBags.forEach((v)=>{
                    v.checked=1
                })
            }
            else {
                newBags.forEach((v)=>{
                    v.checked=0
                })
            }
            this.undataBags(newBags)
        },
    }
})
