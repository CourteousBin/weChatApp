
Page({
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {

        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        that.setData({
          user_logo: avatarUrl,
          user_name: nickName
        })
      }
    })
  },
  // 大范围
  onTap: function () {
    var that = this;
    // 跳转子级 , 一般小程序只有 5级
    // wx.navigateTo({
    //   url: '../posts/post',
    // });

    // 跳转新页面(非子集)
    // wx.redirectTo({
    //   url: '../posts/post',
    // })

    // 跳转到有tab的页面
    wx.switchTab({
      url: '../posts/post',
    })
  }
})
