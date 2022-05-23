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
        showBags:false
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
            console.log(e.detail.value);
        },
        showList(){
            this.triggerEvent('openBagsList')
        }
    }
})
