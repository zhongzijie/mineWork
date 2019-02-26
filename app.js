//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("res.code=" + res.code);
        wx.showToast({
          title: res.code,
        })
        var that = this;
        //127.0.0.1:8080   www.care2com.cn  https://app.5iuhu.cn/trade/openid.action
        wx.request({
          url: 'https://app.5iuhu.cn/trade/openid.action',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log('openid==============' + res.data.openid);
            that.globalData.openid = res.data.openid;
            that.globalData.appKey = res.data.session_key;
          },
          fail:function(res){
            console.log('请求失败');
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    recharge:'',
    userName:'',
    openid: '',
    appKey: '',
    userInfo: null,
    wenben1: "未缴纳押金不可以使用",
    wenben2: "缴纳押金",
  }
})