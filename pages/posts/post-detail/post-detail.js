var postsData = require('../../data/post-data.js');
// 获取全局变量
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 全局变量
    var globalData = app.globalData;
    var postId = options.id;
    // 把传过来的数据保存下 , 方便其他方法使用
    this.data.currentPostId = postId;

    var postData = postsData.postList[postId];
    // 数据绑定
    this.setData({
      postData: postData
    });

    // 特点:缓存是一直存在的
    // wx.setStorageSync('key', '风暴英雄');
    // 修改缓存
    // wx.setStorageSync('key', {
    //   game:'魔兽争霸3冰封王座',
    //   developer:'暴雪'
    // })

    // 通过缓存判断用户是否收藏文章
    // posts_collected 装着 文章是否被收藏的记录
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      // 如果有记录 , 则直接获取收藏记录
      var postCollected = postsCollected[postId];
      this.setData({
        // 让前端页面发生变化
        collected: postCollected
      })
    } else {
      // 如果新用户 , 那么创建一个新对象 , 用来装着数据
      var postsCollected = {};
      // 新对象 , 默认为 false
      postsCollected[postId] = false;
      // 设置缓存
      wx.setStorageSync('posts_collected', postsCollected);
    }

    // 判断全局变量是否为播放
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      this.setData({
        isPlayingMusic:true
      })
    }

    // 监听音乐状态
    this.setAudioMonitor();
  },

  setAudioMonitor:function(){
    // 监听音乐播放或者暂停
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })

      // 设置全局变量
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.crrentPostId;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  onCollectionTap: function (event) {
    // 同步获取缓存
    // var game = wx.getStorageSync('key');
    // console.log(game);

    // 获得缓存
    var postsCollected = wx.getStorageSync('posts_collected');
    // 获取缓存 当前页面postId 的值
    var postCollected = postsCollected[this.data.currentPostId];

    // 点击一次,取反
    postCollected = !postCollected;
    // 更新缓存
    postsCollected[this.data.currentPostId] = postCollected;
    // wx.setStorageSync('posts_collected', postsCollected);
    // // 更新数据绑定
    // this.setData({
    //   collected: postCollected
    // })

    // this.showModal(postsCollected, postCollected);
    this.showToast(postsCollected, postCollected);
  },
  onShareTap: function (event) {
    // 清楚指定缓存
    // wx.removeStorageSync('key');
    // 清除所有
    // wx.clearStorageSync();
    wx.showActionSheet({
      itemList: [
        "分享到微信",
        "分享到Sina",
        "分享到QQ好友",
        "分享到朋友圈"
      ],
      success:function(res){
        // res.cancel 用户点击了取消
        // res.tapIndex 用户选择了第几个
        console.log(res);
        wx.showModal({
          title: '用户选择了' + [
            "分享到微信",
            "分享到Sina",
            "分享到QQ好友",
            "分享到朋友圈"
          ][res.tapIndex],
          showCancel: true,
        })
      }
    })
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章?':'取消收藏该文章?',
      showCancel: 'true',
      cancelText: '取消',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showToast: function (postsCollected, postCollected){
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      // 三元运算
      title: postCollected?"收藏成功":"取消成功",
      duration:1000,
      // loading success 都可以
      icon:"success" 
    })
  },
  onMusicTap:function(event){
    // 获得当前id
    var currentPostId = this.data.currentPostId;

    // 获得数据
    // console.log(postsData.postList[currentPostId].music.url);

    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        // 动态获取数据
        dataUrl: postsData.postList[currentPostId].music.url,
        title: postsData.postList[currentPostId].music.title, 
        coverImgUrl: postsData.postList[currentPostId].music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})