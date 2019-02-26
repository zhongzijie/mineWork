// pages/kaishiyuding/kaishiyuding.js
Page({
  data: {
    dates: '2016-11-08',
    dates2: '2016-11-09',
    index: 0,
  },
  
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates2: e.detail.value
    })
  },
  
    
  
})