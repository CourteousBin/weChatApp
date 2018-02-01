// 引入豆瓣数据
var top250 = require('../data/top250.js');
var in_theaters = require('../data/in_theaters.js');
var coming_soon = require('../data/coming_soon.js');

// 引入星星数组方法
var util = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 在request中 ,是异步操作,如果不初始化数据绑定会报错
    // 最好做一个初始值
    in_theaters:{},
    coming_soon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(top250);
    // console.log(in_theaters);
    // console.log(coming_soon);
    this.processDounBanData(top250.Top250,"top250",'豆瓣top250');
    this.processDounBanData(in_theaters.in_theaters,"in_theaters",'正在热映');
    this.processDounBanData(coming_soon.coming_soon,"coming_soon",'即将上映');
  },
  processDounBanData:function(moviesDouban,settedKey,catetoryTitle){
    
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+ '...';
      }
      var temp = {
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }

    var readyData = {};
    readyData[settedKey] = {
      catetoryTitle:catetoryTitle,
      movies:movies
    };
    this.setData(readyData);
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url:'more-movie/more-movie?category='+category
    })

  },
  onBindFocus:function(event){
    console.log('show search');
  }
})