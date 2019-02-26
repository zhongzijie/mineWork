// pages/guzhang/guzhang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  paizhao:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  
  xuantu(){
    
    wx.chooseImage({
      count:1,
      success: function ({ tempFilePaths }) {
        wx.uploadFile({
          url: "https://app.5iuhu.cn/fault/upload.action", //上传地址
          filePath: tempFilePaths[0],//要上传的文件，只有1张图片也是数组，所以[0]
          name: "tupian",   //key 
          fail: function(){
            wx.showToast({
              title: "请求上传失败！"
            });
          },
          success: function (res) {
            if(res.data.code==='0'){
              wx.showToast({
                title: "上传成功！"
              });
            }else{
              wx.showToast({
                title: "上传失败！"
              });
            }
            
          }

        });
        
      },
     
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