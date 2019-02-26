//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cabine:'01234567',
    phoneNum:'',
    userName:'',
    url:'',
    recharge:'',
    str:{},
    orderId:'',
    CabinetCode:'',
    code:''
  },

  // shengchengOrder(){
  //   var outTradeNo = "";  //订单号
  //   for (var i = 0; i < 8; i++) //6位随机数，用以加在时间戳后面。
  //   {
  //     outTradeNo += Math.floor(Math.random() * 10);
  //   }
  //   outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，用来生成订单号。
  //   return outTradeNo;
  // },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  //扫码用床还床
  saoma() {
    console.log("带参数的请求");
    var that = this;
    //1，第一种情况，用户没有注册
    //从缓存中获取用户名或者从数据库中获取
    var userName = wx.getStorageSync("userName")
    console.log("userName==="+userName)
    
    if (userName === '') {
      wx.navigateTo({
        url: '/pages/yanzheng/yanzheng',
      })
     return;
    }
    //2，用户没有充值押金
    var recharge = wx.getStorageSync("recharge")
    that.data.recharge = recharge;
    console.log("recharge===" + recharge);
    if (that.data.recharge===''){
      wx.navigateTo({
        url: '/pages/yajin/yajin',
      })

      return;
    }

    //3，判断是否有订单，有的话就归还？？？如果非空，跳转到计时支付界面
    //请求查看当前订单接口
    // wx.request({
    //   url: 'http://127.0.0.1:8080/order/searchOrderNow.action',
    //   data: {
    //     userName: that.data.userName,
    //     cabinetCode: '01234567'
    //   },
    //   success: function (res) {
    //     var orderId = res.data.orders[0].orderId
    //     that.setData({
    //       orderId: orderId,
    //     })
    //     console.log("that.data.orderId==" + JSON.stringify(res.data));
    //   }
    // })
    if (that.data.code === '1113331111'){
      wx.showModal({
        title: '是否需要还床',
        content: '还床请点击确定',
        success: function (res) {
          if (res.confirm) {
            wx.scanCode({
              success(res){
                that.setData({
                  url: res.result
                })
                wx.request({
                  url: res.result,
                  data:{
                    userName: userName,
                    cabinetCode: '01234567'
                  },
                  success:function(res){
                    //kai men  success
                    if(res.data.code == '1'){
                      var time2 = new Date();
                      wx.setStorage({
                        key: 'second',
                        data: time2,
                      })
                      wx.navigateTo({
                        url: '/pages/jishi/jishi',
                      })
                    }else{
                      wx.showToast({
                        title: '柜门打开失败',
                      })
                    }
                    
                  }
                })
              }
            })
            // wx.request({
            //   url: 'http://127.0.0.1:8080/cmd/open.action',
            //   data:{
            //     userName:that.data.userName,
            //     cabinetCode: '002'
            //   },
            //   success:function(){
            //     wx.navigateTo({
            //       url: 'pages/jishi/jishi',
            //     })
            //     wx.showToast({
            //       title: '请求还床成功',
            //     })
            //   },
            //   fail:function(){
            //     wx.showToast({
            //       title: '请求还床失败',
            //     })
            //   }
            // })
          } else {
            console.log('用户点击取消')
          }

        }
      })
      return;
    }
    
    //4，验证和交押金以后就可以扫码
   wx.scanCode({
     success(res){
       console.log("成功===================" + res.result)
       that.setData({
         url:res.result
       })
      //  wx.showToast({
      //    title: '扫码成功',
      //  })
      //发送开门请求
       wx.request({
         url: res.result,
         data:{
           userName: userName,
           cabinetCode:'01234567'
         },
         success:function(res){
           console.log("res==="+JSON.stringify(res));
           console.log("发送开门请求成功")
           if (res.data.msg ==='柜门打开成功'){
             
             that.setData({
               code:'1'
             })



             var time1 = new Date();
             wx.setStorage({
               key: 'first',
               data: time1,
             })

             //跳转到计时界面
             wx.redirectTo({
               url: '/pages/jishi/jishi?code=' +1,
             })
           }else{
             wx.showToast({
               title: '柜门打开失败',
             })
           }

         },
         fail:function(res){
           console.log("发送开门请求失败")
         }
       })
     }
   })
    

    
    
   
  },
  // btn() {
  //   console.log("带参数的请求");
  //   wx.request({
  //     url: 'http://www.fushane.com:8080/crm1003/user/insert.action',
  //     data: {
  //       cNo: '60001',
  //       action: '1',
  //       userName: '13918544291'
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       wx.showToast({
  //         title: '成功',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //     },
  //     fail: function (res) {
  //       console.log(res.data)
  //       wx.showToast({
  //         title: '失败',
  //         icon: 'fail',
  //         duration: 2000
  //       })
  //     }
  //   })
  // },
  //提示页面
  tishi() {

    var that = this
    that.data.userName=wx.getStorageSync('userName')
    console.log("that.data.userName==" + that.data.userName)
    if(that.data.userName===''){
      wx.navigateTo({
        url: '/pages/yanzheng/yanzheng',
      })

      return;
    }
    wx.navigateTo({
      url: '/pages/tishi/tishi'
    })
  },

//我的页面
  me() {
    var that = this
    that.data.userName = wx.getStorageSync('userName')
    console.log("that.data.userName==" + that.data.userName)
    if (that.data.userName === '') {
      wx.navigateTo({
        url: '/pages/yanzheng/yanzheng',
      })

      return;
    }

    wx.navigateTo({
      url: '/pages/me/me'
    })
  },
  onLoad: function () {
    // var that = this
    // wx.request({
    //   url: 'http://127.0.0.1:8080/order/searchOrderNow.action',
    //   data: {
    //     userName: that.data.userName,
    //     cabinetCode: '01234567'
    //   },
    //   success: function (res) {
        
    //     that.setData({
    //       orderId: res.data.orderId
    //     })
    //     console.log("that.data.orderId==" + JSON.stringify(res.data));
    //   }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
