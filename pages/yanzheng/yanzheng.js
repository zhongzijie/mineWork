// pages/yanzheng/yanzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheck: false,
    color: "#3CA7BD",
    disabled: false,
    getCode: "获取验证码",
    phoneNumber:'',
    code:'',
    res:{}
    
  },
  radioClick: function (event) {
    var radioCheck = this.data.radioCheck;
    this.setData({ "radioCheck": !radioCheck });
  },
  radioChange(){
    
  },
  //获取输入的手机号码
  inputPhoneNum:function(e){
    let phoneNumber = e.detail.value
    // wx.setStorage({
    //   key: 'userName',
    //   data: phoneNumber,
    // })
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
      if (checkedNum) {
        this.setData({
          phoneNumber: phoneNumber
        })
        console.log('phoneNumber===' + this.data.phoneNumber)
      }
    } else {
      this.setData({
        phoneNumber: ''
      })
    }
  },
  //校验手机号格式
  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      return false
    }
  },
//获取验证码
  addCode:function(e){
    this.setData({
      code: e.detail.value
    })
    console.log('code==='+this.data.code);
  },
  //发送验证码和手机号码到后台
  xiaoyan:function(){
    var that = this;
    console.log('phoneNumber===' + that.data.phoneNumber)
    console.log('code===' + that.data.code);
  wx.request({
    url: 'https://app.5iuhu.cn/verification/verificationCode.action',
    data:{
      phoneNumber: that.data.phoneNumber,
      code: that.data.code
    },
     success(res) {
      console.log("返回的数据"+JSON.stringify(res.data))
       if (res.data.msg ==='验证通过'){
         wx.navigateTo({
           url: '/pages/yajin/yajin',
         })

         //验证通过保存用户名到缓存
         wx.setStorage({
           key: 'userName',
           data: that.data.phoneNumber,
         })
       }else{
         wx.showToast({
           title: '验证失败',
         })
       }
    }
  })

  },
//发送手机号码到后台
  sendCode:function(){
    console.log("手机号码:" + this.data.phoneNumber);
    var that = this;
    wx.request({
      url:'https://app.5iuhu.cn/verification/getCode.action',
      data:{
      phoneNumber:that.data.phoneNumber
      }
    })

    // wx.showToast({
    //   title: this.data.phoneNumber,
    // })

    var that = this;
    var times = 0
    var i = setInterval(function () {
      times++
      if (times >= 60) {
        that.setData({
          color: "#42A3DC",
          disabled: false,
          getCode: "获取验证码",
        })
        clearInterval(i)
      } else {
        that.setData({
          getCode: "重新获取" + times + "s",
          color: "#999",
          disabled: true
        })
      }
    }, 1000)

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