// pages/movies/movies-details/movies-details.js
const star = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneMovie: {},
    star:[]
  },
  viewMoviePostImg: function (e) {
    wx.previewImage({
      urls: [this.data.oneMovie.header],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'moviedetail',
      data: {
        id: options.id
      }
    }).then(res => {   
      this.setData({
        oneMovie: JSON.parse(res.result)
      })
      const { average } = this.data.oneMovie.rating
      this.setData({star:star.changeToStar(average)})
    }).catch(err => {
      console.log(err)
    })
  }
})