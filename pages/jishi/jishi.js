// pages/jishi.js\
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:0,
    tatolSecond:0,
    orderId:'',
    miao:0,
    fen:0,
    zhong:0
  },


//扫码还床
  saoma(){
   var that = this;
    var userName = wx.getStorageSync("userName")
    if (that.data.code === '1') {
      wx.showModal({
        title: '是否需要还床',
        content: '还床请点击确定',
        success: function (res) {
          if (res.confirm) {
            wx.scanCode({
              success(res) {
                that.setData({
                  url: res.result
                })
                wx.request({
                  url: res.result,
                  data: {
                    userName: userName,
                    cabinetCode: '01234567'
                  },
                  success: function (res) {
                    //kai men  success
                    if (res.data.code === '1') {
                      //跳转到支付界面
                      wx.redirectTo({
                        url: '/pages/zhifu/zhifu',
                      })
                      // var time2 = new Date();
                      // wx.setStorage({
                      //   key: 'second',
                      //   data: time2,
                      // })
                    } else {
                      wx.showToast({
                        title: '柜门打开失败',
                      })
                    }

                  }
                })
              }
            })
          } else {
            console.log('用户点击取消')
          }

        }
      })
      return;
    }
  },

  shengchengOrder(){
    var outTradeNo = "";  //订单号
    for (var i = 0; i < 8; i++) //6位随机数，用以加在时间戳后面。
    {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。
    return outTradeNo;
  },

  //请求后台支付接口,将时间，openid，订单号发送到后台
  zhifu: function () {
  var that = this
  var orderid=that.shengchengOrder()
  //https://app.5iuhu.cn/trade/zhifu.action
   wx.request({
     url: 'https://app.5iuhu.cn/trade/zhifu.action',
     data:{
       orderId: orderid,
       openid: app.globalData.openid,
       time:that.data.tatolSecond
     },
     success:function(res){
       console.log("res.data.timeStamp=" + res.data.timeStamp);
       console.log(" res.data.nonceStr=" + res.data.nonceStr);
       console.log("res.data.package=" + res.data.package);
       wx.requestPayment(
         {
           'timeStamp': res.data.timeStamp,
           'nonceStr': res.data.nonceStr,
           'package': res.data.package,
           'signType': 'MD5',
           'paySign': res.data.paySign,
           'success': function (res) {

             wx.showToast({
               title: '支付床费成功',
             })

             wx.navigateTo({
               url: '/pages/index/index',
             })            
             //支付成功后往后台发送押金数据保存到数据库  
           },
           'fail': function (res) {
             wx.showToast({
               title: '支付床费失败',
             })
           },

         })

      //  wx.navigateTo({
      //    url: '/pages/zhifuchenggong/zhifuchenggong',
      //  })
     }
   })
    
    wx.showToast({
      title: '请求支付接口',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    //获取从index页面带来的code
    var code = options.code;
    that.setData({
      code: code
    })
    //计算时间
    // var date1 = wx.getStorageSync('first')
    // var date2 = wx.getStorageSync('second')
    // var tatolSecond = (date2.getTime() - date1.getTime())/1000
    // console.log("tatolSecond===" + tatolSecond)
   
    
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
        console.log("res.data.orders[0].orderId"+JSON.stringify(res))
        wx.showToast({
          title: res.data.orders[0].orderId,
        })
      }
    })
    // var a = 0 / 19;
    // console.log("a======="+a);
    // var page = this
    // setInterval(function(){
    //   page.setData({
    //     miao: ++page.data.miao
    //   })
    //   //page.data.miao=30;
    // },1000)
    // var date = new Date();
    // var date2 = Date.parse(date);
    // var date1 = wx.getStorageSync('first')
    // var tatolSecond = (date2 - date1)/1000;
    
    // var second = tatolSecond;
    // //小时数
    // var hour = Math.floor(second / 60 / 60);
    // console.log("hour=======" + hour);
    // var hs = hour.toString();
    // if (hs.length == 1) hs = '0' + hs;
    // //分钟数
    // var mimute = Math.floor((second - hour * 60) / 60);
    // console.log("mimute=======" + mimute);
    // var ms = mimute.toString();
    // if (ms.length == 1) ms = '0' + ms;
    // //秒数
    // var sec = (second - hour * 3600 - mimute * 60);
    // console.log("sec=======" + sec);
    // if (sec < 0) sec = 1;
    // var secs = sec.toString();
    // if (secs.length == 1) secs = '0' + secs;

    // that.setData({
    //   miao: secs,
    //   fen: ms,
    //   zhong: hs,
    // });

    //计时器
    var tatolSecond = 0;
    var interval = setInterval(function () {
    var second = tatolSecond;
    
      //小时数
      var hour = Math.floor(second / 60 / 60);
      console.log("hour=======" + hour);
      var hs = hour.toString();
      if (hs.length == 1) hs = '0' + hs;
      //分钟数
      var mimute = Math.floor((second - hour * 60) / 60);
      console.log("mimute=======" + mimute);
      var ms = mimute.toString();
      if (ms.length == 1) ms = '0' + ms;
      //秒数
      var sec = (second - hour * 3600 - mimute * 60);
      console.log("sec=======" + sec);
      if(sec < 0) sec = 1;
      var secs = sec.toString();
      if (secs.length == 1) secs = '0' + secs;

      that.setData({
        miao: secs,
        fen: ms,
        zhong: hs,
      });

      tatolSecond++;
      if (tatolSecond == 36000) {
        clearInterval(interval);
      }
    }, 1000)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this;
    // var tatolSecond = 0;
    // var interval = setInterval(function(){
    //   var second = tatolSecond;
    //   //小时数
    //   var hour = Math.floor(second / 60 / 60);
    //   var hs = hour.toString();
    //   if(hs.length==1) hs = '0'+hs;
    //   //分钟数
    //   var mimute = Math.floor((second - hour*60)/60);
    //   var ms = mimute.toString();
    //   if(ms.length==1) ms = '0'+ms;
    //   //秒数
    //   var sec = second - hour*3600 - minute*60;
    //   var secs = sec.toString();
    //   if(secs.length==1) secs = '0'+secs;
      
    //   that.setData({
    //     miao: secs,
    //     fen: ms,
    //     zhong: 24,
    //   });

    //   tatolSecond++;
    //   if (tatolSecond==36000){
    //     clearInterval(interval);
    //   }
    // },1000)

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