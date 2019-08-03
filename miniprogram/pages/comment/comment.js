// pages/comment/comment.js
const db = wx.cloud.database();//初始数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starIndex1:0,//星星的个数
    comments:[],//评论
    content:'',//输入框的内容
    images:[],//上传的图片路径
    fileIds:[],//
    movieid:-1,//每个电影的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this =this
    this.setData({ movieid: options.id})
    wx.cloud.callFunction({
      name: 'moviedetail',
      data: {
        id: options.id
      }
    }).then(res => {
      let newComments = JSON.parse(res.result).popular_comments
      newComments.forEach(item=>{
        if(item.content.length>100){
          item.content=item.content.substring(0,100)+"...";//评论字数过长删减
        }
      })
      _this.setData({
        comments: newComments
      })
    }).catch(err => {
      console.log(err)
    })
  },
  onChange1:function(e){
    console.log(e)
    this.setData({
      starIndex1:e.detail
    })
  },
  upImage:function(){//上传图片
    const _this = this 
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        _this.setData({ images: _this.data.images.concat(tempFilePaths)})      
      }
    })
  },
  getContent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  handSubmit:function(){
    let promiseArr=[]
    this.data.images.forEach(item=>{
      promiseArr.push(new Promise((req,res)=>{
        let entName = item;
        let suffix = /\.\w+$/.exec(item)[0]//正则表达式，返回文件的扩展名
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+suffix ,//上传至云端的路经
          filePath:item,//小程序临时文件名
          success:res=>{
              this.setData({fileIds:this.data.fileIds.concat(res.fileID)})
              req();
          },
          fail:console.error
        })
      }))
    })
    Promise.all(promiseArr).then(res => {
      wx.showLoading({
        title: '评价中',
      })
      db.collection("comments").add({
        data: {
          content: this.data.content,
          movieid: this.data.movieid,
          fileIds: this.data.fileIds,
          score: this.data.starIndex1
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '评价成功'
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '评价失败',
        })
      })
    })
  }
})