Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie();
  },
  getMovie:function(){
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.cloud.callFunction({
      name: "movielist",
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
    })
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: `../movies-details/movies-details?id=${e.currentTarget.dataset.id}`,
    })  
  },
  gotoComment:function(e){
    wx.navigateTo({
      url: `../comment/comment?id=${e.currentTarget.dataset.id}`,
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovie();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})