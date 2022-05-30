// pages/note/index.js
const app = getApp()
Page({

    data: {
        note:""
    },

    onLoad(options) {

    },
    clickButton(){
        console.log("测试");
        wx.navigateBack({
          delta: 1,
        })
    },
    changeWords(e){
        this.setData({
            note:e.detail.value
        })
        app.globalData.note=e.detail.value
    },



    onShow() {
        this.setData({
            note:app.globalData.note
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
    click(){

    }

})