// 在这个页面引入脚本文件
// 注意 , 引用js文件只能用相对路径
var postsData = require('../data/post-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据绑定 不能var 全部是对象
    // date:"Sep 18 2016"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { //options 为其他页面跳转过来带来的参数
    // 将变量写入Data
    this.setData({
      posts_key: postsData.postList
      });
    // 第二种写法
    // this.data.posts_key = postsData.postList;
  },
  
  // event 传入到方法
  onPostTap:function(event){
    // 获取标签属性的值
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      // 跳转页面传值
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  // banner跳转
  onSwiperItenTap: function (event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      // 跳转页面传值
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
// 利用事件冒泡banner 跳转
  onSwiperTap:function(event){
    // target 与 currentTarget 有什么区别呢
    // target 指的是当前点击的组件
    // currentTarget 值的是事件捕获的组件
    // target这里指的是imae,而currentTarget值的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      // 跳转页面传值
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})