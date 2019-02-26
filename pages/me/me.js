// pages/me/me.js
const app = getApp()
Page({

  data: {
    b: true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 页面的初始数据
   */
  test:function(){
    // wx.navigateTo({
    //   url: '/pages/qianbao/qianbao'
    // })
  },

  order(){
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  yuding() {
    // wx.navigateTo({
    //   url: '/pages/yuding/yuding'
    // })
  },
  qianbao(){
    wx.navigateTo({
      url: '/pages/qianbao/qianbao'
    })
  },
  guzhang(){
    wx.navigateTo({
      url: '/pages/guzhang/guzhang'
    })
  },
  didian(){
    wx.navigateTo({
      url: '/pages/didian/didian'
    })
  },
  aboutus() {
    wx.navigateTo({
      url: '/pages/we/we'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      userInfo: app.globalData.userInfo
    })
    
  },
  

 


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})