const class_list=[{
    title:'热销'
},{
    title:'原味.鲜奶茶'
},{
    title:'四时.鲜果赋'
},{
    title:'四时.鲜果赋'
},{
    title:'四时.鲜果赋'
}];
const baseGood={
    title:'春日桃桃',
    describe:'霸王茶几经典款&畅销款，第一次尝试的最佳选项畅销款，第一次尝试的最佳选项畅销款，第一次尝试的最佳选项畅销款，第一次尝试的最佳选项畅销款，第一次尝试的最佳选项',
    price:16,
    images:"../../images/head.png",
    attr_detail:[
        {title:'温度',list:["标准冰","少冰","去冰","冰沙","热"]},
        {title:'甜度',list:['标准糖','少糖','半糖','微糖','不另外加糖']},
        {
        title:'其他',
        list:['堂食']},
        {
            title:'杯型',
            list:["中杯"]
        },
        
    ]
}
const goodsList=[
    [baseGood,baseGood],
    [baseGood,baseGood],
    [baseGood,baseGood,baseGood,baseGood],
    [baseGood,baseGood],
    [baseGood,baseGood,baseGood,baseGood]
]
module.exports={
    goodsList,
    class_list,
}