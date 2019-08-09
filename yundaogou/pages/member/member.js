Page({
  data: {
    page: 1,
    servletType: false
  },
  onLoad(query) {
    var that = this;
    // 页面加载
    dd.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          DDrecord: res.data.userInfo.DDrecord,
          sqlrecord: res.data.userInfo.sqlrecord
        })
        console.log(that.data.DDrecord)
        console.log(that.data.sqlrecord, '牛逼牛逼没有了')
      },
      fail: function(res) {
        dd.alert({ content: res.errorMessage });
      }
    });
    this.servletList()
  },
  servletList: function() {
    var that = this;
    dd.httpRequest({
      url: getApp().globalData.BASE_URL + 'servlet/ddxcx/retailCustomerList',
      data: {
        id: that.data.sqlrecord.sysId,
        page: that.data.page,
        limit: 10
      },
      method: 'POST',
      success: function(res) {
        console.log(res, '!!!!')
        if (res.status == 200) {
          that.setData({
            servletList: res.data.ladel
          })
          console.log(that.data.servletList)
        }
      }
    })
  },
  //跳转到添加页面,带参数1为添加页面
  addUser: function() {
    dd.navigateTo({
      url: '/pages/addMember/addMember?index=1'
    })
  },
  //跳转到修改页面,带参数为2是修改页面
  amendUser: function(e) {
    console.log(e.currentTarget.dataset.id)
    dd.navigateTo({
      url: '/pages/addMember/addMember?index=2&id=' + e.currentTarget.dataset.id
    })
  },
  //搜索按钮
  searchInput: function(e) {
    console.log(e.detail.value)
    var that = this;
    dd.httpRequest({
      url: getApp().globalData.BASE_URL + 'servlet/ddxcx/retailCustomerList',
      method: 'POST',
      data: {
        query: e.detail.value,
        id: that.data.sqlrecord.sysId
      },
      success: function(res) {
        console.log(res)
        that.setData({
          servletList: res.data.ladel,
        })
      }
    })
  },
  onScrollToLower: function(e) {
    var that = this;
    console.log(that.data.page)
    dd.httpRequest({
      url: getApp().globalData.BASE_URL + 'servlet/ddxcx/retailCustomerList',
      data: {
        id: that.data.sqlrecord.sysId,
        page: that.data.page + 1,
        limit: 10
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.ladel.length > 1) {
          var newArticles = that.data.servletList.concat(res.data.ladel)
          console.log(newArticles)
          that.setData({
            servletList: newArticles,
            page: that.data.page + 1
          })
        } else {
          that.setData({
            servletType: true
          })
        }
      }
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.servletList()

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
