// [1,1,1,1,0]	星星的制作,
function convertToStarsArray(stars) {
  // 4.5评分,去掉.5 , 直接变成4星评分
  var num = stars.toString().substring(0, 1);
  var array = [];
  // 拼成 [1,1,1,0,0] 数组
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack) {
    wx.request({
      url: url,
      method: 'GET', 
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        callBack(res.data);
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  }

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http
}