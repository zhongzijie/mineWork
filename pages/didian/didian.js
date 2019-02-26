// pages/didian/didian.js
Page({
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['华山医院', '上海东方医院', '同济医院', '北大医院', '上海儿童医院', '复旦大学附属医院'],//下拉列表的数据
    index: 0//选择的下拉列表下标
  },

  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  

 
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }
})