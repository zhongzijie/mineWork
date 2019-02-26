// pages/yajin/yajin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//交押金
  zhifuyajin:function(){
   
    // wx.showToast({
    //   title: 'chenggong',
    // })
    console.log("app.globalData.apenId====" + app.globalData.openid);
    var openid = app.globalData.openid;
    var that = this;
    var phoneNuber=wx.getStorageSync('userName')
    // http://localhost:8080/crm123/customer/yufu.action'
    // http://127.0.0.1:8080/trade/yufu.action  app.5iuhu.cn
    console.log('openid=='+openid);
    console.log('phoneNuber==' + phoneNuber);
    wx.request({
      url: 'https://app.5iuhu.cn/trade/yufu.action',
      data: {
        openid: openid,
        phoneNumber: phoneNuber
      },
      success: function (res) {
        console.log("res.data.package=" + res.data.package);
        console.log("res.data.nonceStr=" + res.data.nonceStr);
        console.log("res.data.timeStamp=" + res.data.timeStamp);
        console.log("res.data.paySign=" + res.data.paySign);

        wx.showToast({
          title: '成功请求',
        })

        wx.requestPayment(
          {
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {

             //如何判断支付成功？？？
             app.globalData.wenben1='199'
             app.globalData.wenben2 = "退还押金"

             wx.showToast({
                title: '支付押金成功',
              })
              //保存押金到缓存
              wx.setStorage({
                key: 'recharge',
                data: '199',
              })
              //支付成功后往后台发送押金数据保存到数据库
              wx.request({
                url: 'https://app.5iuhu.cn/customer/recharge.action',
                data: {
                  phoneNumber:phoneNuber,
                  deposit:'199'
                },
                success:function(){
                  wx.showToast({
                    title: '发送成功',
                  })
                }
              })
             //跳转到首页
              wx.navigateTo({
                url: '/pages/index/index',
              })
              
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付押金失败',
              })
            },

          })
      },
      fail:function(){
        wx.showToast({
          title: '请求支付失败',
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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