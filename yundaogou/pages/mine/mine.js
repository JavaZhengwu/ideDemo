Page({
  data: {},
  onLoad() {
    this.jifen()
  },
  jifen: function() {
    var that = this;
    dd.httpRequest({
      // url: getApp().globalData.BASE_URL +''
    })
  },
  IntegralRecord: function() {
    dd.navigateTo({
      url: '/pages/IntegralRecord/IntegralRecord'
    })
  },
  //跳转到零售订单页面
  retailOrders: function() {
    dd.navigateTo({
      url: '/pages/retailOrder/retailOrder'
    })
  }
});
