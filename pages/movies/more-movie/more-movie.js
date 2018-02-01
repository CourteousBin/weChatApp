// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/utils.js');
Page({

  data: {
    // 异步请求做个数据绑定
    movies:{},
    // 判断movies是否有数据
    isEmpty:true
  },

  onLoad: function (options) {
    var category = options.category;

    switch(category){
      case "正在热映":
        var url ='https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=366'
        break;
      case "即将上映":
        var url = 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=373'
        break;
      case "豆瓣top250":
        var url = 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290'
        break;    
    };
    // 保存当下的url
    this.data.requestUrl = url;

    // 请求
    util.http(url,this.processDounBanData);


    // 设置页面标题
    this.setNavigationBarTitle(category);

  },
  // 设置页面标题
  setNavigationBarTitle:function(data){
    wx.setNavigationBarTitle({
      title:data
    })
  },
  processDounBanData:function(data){
    console.log(data.movies);
    var movies = [];
    for (var idx in data.movies){

      var subject = data.movies[idx];
      var title = subject.titleCn;
        if(title.length >= 6){
          title = title.substring(0,6)+ '...';
        }
        var temp = {
          stars:util.convertToStarsArray(40),
          title:title,
          average: subject.ratingFinal,
          coverageUrl: subject.img,
          movieId: subject.movieId
        }
        movies.push(temp);
    }
    // 如果要绑定新的数据,那么就需要和旧的数据合并在一起
      var totalMovies = {};
      if(!this.data.isEmpty){
        totalMovies = this.data.movies.concat(movies);
        console.log('!isEmpty')
        console.log(totalMovies)
      }else {
        totalMovies = movies;
        this.data.isEmpty = false;
        console.log('isEmpty')
        console.log(totalMovies)
      }
      this.setData({
        movies: totalMovies
      });
      // 做数据累计(对于现在来说没什么用)
      // this.data.totalCount += 20;

      // 隐藏正在加载
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    
  },
  onScrollLower:function(event){
    // var nextUrl = this.data.requestUrl + "?start="+this.data.totalCount + "&count=20";
    var nextUrl = 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=347';
    util.http(nextUrl, this.processDounBanData);
    // 提示正在加载
    wx.showNavigationBarLoading();

    // 视频看到8-6.7
  },
    onPullDownRefresh:function(event){
      var refreshUrl = this.data.requestUrl;
      // 清空数据,要不然会两组数据链接
      this.setData({
        movies:{},
        isEmpty:true
      })
      util.http(refreshUrl, this.processDounBanData);
    }
})