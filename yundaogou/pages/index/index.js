Page({
  data: {
    backgroundImg: [
      '../../img/lbt.png',
      '../../img/lb.jpg',
      '../../img/yy.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    chievementDetails: [],
    paimingList: [
      { 'img': '../../img/paiming/1.png' },
      { 'img': '../../img/paiming/2.png' },
      { 'img': '../../img/paiming/3.png' },
      { 'img': '../../img/paiming/4.png' },
      { 'img': '../../img/paiming/5.png' },
      { 'img': '../../img/paiming/6.png' },
      { 'img': '../../img/paiming/7.png' },
      { 'img': '../../img/paiming/8.png' },
      { 'img': '../../img/paiming/9.png' },
      { 'img': '../../img/paiming/10.png' },
    ]
  },

  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  onLoad(query) {
    var that = this;
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    dd.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data.userInfo.sqlrecord.sysId)
        that.setData({
          userId: res.data.userInfo.sqlrecord.sysId
        })
        console.log(that.data.userId)
      }
    });
    this.indexList()
  },
  //获取首页信息
  indexList: function() {
    var that = this;
    dd.httpRequest({
      url: getApp().globalData.BASE_URL + 'ahoppingGuideDDapi!listJson.do',
      method: 'POST',
      data: {
        userId: that.data.userId
      },
      success: function(res) {
        console.log(res.data.data.AchievementDetails)
        that.setData({
          indexList: res.data.data,
          advertises: res.data.data.advertises,
          chievementDetails: res.data.data.AchievementDetails
        })
        for (let i = 0; i < that.data.chievementDetails.length; i++) {
          var img = '../../img/paiming/' + [i + 1] + '.png'
          var name = 'chievementDetails[' + i + '].img';
          that.setData({
            [name]: img
          });
        }
        console.log(that.data.indexList)
        console.log(that.data.advertises)
      }
    })
  },

  /**
   * 跳转到通知页面的第二个index
   */
  jumpTzTwo: function() {
    console.log(111)
    dd.switchTab({
      url: '/pages/information/information'
    })
  },
  //跳转到待培训页面
  jumpDpx: function() {
    dd.navigateTo({
      url: '/pages/Mytrain/Mytrain?index=1'
    })
  },
  //跳转到培训页面
  jumpPx: function() {
    dd.navigateTo({
      url: '/pages/Mytrain/Mytrain?index=2'
    })
  },
  //跳转到考核页面
  jumpkaohe: function() {
    dd.navigateTo({
      url: '/pages/myAssess/myAssess'
    })
  },
  //跳转到积分页面
  integral: function() {
    dd.navigateTo({
      url: '/pages/IntegralRecord/IntegralRecord'
    })
  },
  //跳转到会员页面
  memberIndex: function() {
    dd.switchTab({
      url: '/pages/member/member'
    })
  },
  //跳转到收银页面
  cashier: function() {
    dd.navigateTo({
      url: '/pages/cashier/cashier'
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.indexList()

  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
