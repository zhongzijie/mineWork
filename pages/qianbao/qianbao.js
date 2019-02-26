// pages/qianbao/qianbao.js
const app = getApp()
Page({

  /**
   * 页面的初始数据app.globalData.openid
   */
  data: {
    orderId: '',
    phoneNumber: '',
    deposit: 0,
    wenben1: '',
    wenben2: '',
  },
  chongzhi() {
    wx.navigateTo({
      url: '/pages/chongzhi/chongzhi',
    })
  },
  jiantou() {
    wx.navigateTo({
      url: '/pages/youhuijuan/youhuijuan',
    })
  },
  tuihuai() {
    wx.navigateTo({
      url: '/pages/tuihuan/tuihuan',
    })
  },
  //交押金
  yajin_btn() {
    
    var that = this;

    if (that.data.wenben2 === "缴纳押金") {
      wx.navigateTo({
        url: '/pages/yajin/yajin',
      })
      // var recharge = wx.getStorageSync("recharge")
      // if(recharge!=''){
      //    that.setData({
      //      wenben1: "199",
      //      wenben2: "退还押金",
      //    })
      // }

      
    }

    if (that.data.wenben2 === "退还押金") {

      that.tuikuan();
    }

  },
  //退押金
  tuikuan() {


    var that = this;
    wx.request({
      url: 'https://app.5iuhu.cn/trade/refund.action',
      data: {
        //交押金的订单号
        orderId: that.data.orderId,

      },
      success: function (res) {
        //如何判断退款成功
        if (res.data.code === '1') {

          wx.showToast({
            title: '退款成功',
          })
          that.setData({
            wenben1: "未缴纳押金不可以使用",
            wenben2: "缴纳押金"
          })

          //把押金清零
          // that.setData({
          //   deposit: 0
          // })
          //把缓存押金清零
          wx.setStorage({
            key: 'recharge',
            data: '',
          })
          //发送请求，修改数据库押金为零
          wx.request({
            url: 'https://app.5iuhu.cn/customer/refu.action',
            data: {
              phoneNumber: that.data.phoneNumber
            }
          })
        }else{
          wx.showToast({
            title: '退押金失败',
          })
        }


        console.log('refund:' + JSON.stringify(res));
      },
      fail: function (res) {

        console.log('refund:' + JSON.stringify(res.data));

        wx.showToast({
          title: '请求失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     var recharge = wx.getStorageSync("recharge")
      if(recharge!=''){
         that.setData({
           wenben1: "199",
           wenben2: "退还押金",
         })
      }else{
        that.setData({  
            wenben1: "未缴纳押金不可以使用",
            wenben2: "缴纳押金"
        })
      }
    var phoneNumber = wx.getStorageSync("userName")

    
    that.setData({
      phoneNumber: phoneNumber
    })
    //查询押金订单
    wx.request({
      url: 'https://app.5iuhu.cn/deposit/getOrderId.action',
      data: {
        phoneNumber: that.data.phoneNumber,
      },
      success: function (res) {
        that.setData({
          orderId: res.data.order
        })
      }
    })

    wx.request({
      url: 'https://app.5iuhu.cn/customer/search.action',
      data: {
        phoneNumer: phoneNumber,
      },
      success: function (res) {
        that.setData({
          deposit: res.data.customer.deposit
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