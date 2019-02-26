// pages/zhifu/zhifu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
  },
  //前端生成的订单号
  shengchengOrder() {
    var outTradeNo = "";  //订单号
    for (var i = 0; i < 8; i++) //6位随机数，用以加在时间戳后面。
    {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。
    return outTradeNo;
  },

  //支付租床费用
  zhifu:function(){
    console.log("app.globalData.apenId=" + app.globalData.openid);
    var that = this;
    var orderid = that.shengchengOrder();
    var that = this;
    wx.request({
      url: 'https://app.5iuhu.cn/trade/zhifu.action',
      data: {
        orderId: orderid,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log("res.data.package=" + res.data.package);
        console.log("res.data.nonceStr=" + res.data.nonceStr);
        console.log("res.data.timeStamp=" + res.data.timeStamp);
        console.log("res.data.paySign=" + res.data.paySign);
        wx.showToast({
          title: 'chenggong',
        })
        wx.requestPayment(
          {
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
              })
              //跳转到index页面
              wx.navigateTo({
                url: '/pages/index/index',
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
              })
            },

          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userName = wx.getStorageSync("userName")
    //查询当前订单
    wx.request({
      url: 'https://app.5iuhu.cn/order/searchOrderNow.action',
      data: {
        userName: userName,
        cabinetCode: '01234567'
      },
      success: function (res) {
        // that.data.orderId = res.data.orders[0].orderId;
        console.log("res.data.orders[0].orderId" + JSON.stringify(res))
        wx.showToast({
          title: res.data.orders[0].orderId,
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