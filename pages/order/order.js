// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    phoneNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.setData({
    //   phoneNum: options.phoneNum,
    // })
    var phoneNumber =  wx.getStorageSync('userName')
    //发送网络请求订单数据
     wx.request({
       url: 'https://app.5iuhu.cn/order/search.action',
       data:{
         phoneNumber: phoneNumber,
       },
       success:function(res){
         console.log("res==="+JSON.stringify(res));
         console.log("res===" + res.data.orders[0].orderId);
         that.setData({
           order: res.data.orders,
         })
       }
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