App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    console.log(options)
    this.globalData.corpId = options.query.corpId
    dd.getAuthCode({
      success: (res) => {
        console.log(res)
        var code = res.authCode;
        dd.httpRequest({
          url: getApp().globalData.BASE_URL + 'servlet/LoginForDDServlet',
          method: "POST",
          data: {
            code: res.authCode,
            corpId: options.query.corpId
          },
          success: function(res) {
            console.log(res.data)
            var userInfo = res.data
            dd.setStorage({
              key: 'userInfo',
              data: {
                userInfo
              },
              success: function() {
              }
            });
          }
        })
      },
      fail: (err) => {
        dd.alert({ content: JSON.stringify(err) })
      }
    })


  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    // BASE_URL: "http://192.168.2.139:8080/egorder_yhb/",
    BASE_URL: "http://192.168.2.169:8080/egorder_yhb/"
    // BASE_URL: 'http://192.168.2.188:8080/egorder_yhb/'
  }
});
