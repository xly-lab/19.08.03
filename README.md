# 微信小程序

## 名：电影

	（第二个微信小程序）   随视频做的  主要学习小程序的云开发与数据库,iviewUI的引入，npm在小程序中的使用操作
	
### 所有页面初览
	
1. ![index.wxml](/miniprogram/images/movie.jpg)2. ![index.wxml](/miniprogram/images/movie-detail.jpg)
3. ![index.wxml](/miniprogram/images/movie-comment.jpg)4. ![index.wxml](/miniprogram/images/my.jpg)
	
### 第一个页面 入口界面
> ![index.wxml](/miniprogram/images/movie.jpg)
> 	
从豆瓣api获取数据 ` http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}` 现在的豆瓣api访问不了  网上搜的链接要加上apikey参数

### 第二个页面 新闻界面
>![index.wxml](/miniprogram/images/movie-detail.jpg)
>  
>	
同样涉及到api的调用  使用的`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`同样要加上apikey参数


### 第三个页面 
> ![index.wxml](/miniprogram/images/movie-comment.jpg)
>  此页面运用到了wx的云函数，云数据库，文件上传及相关云开发
>	>  数据库的init

		const db = wx.cloud.database()	
		
>	>  文件上传

	wx.chooseImage({
			success (res) {
			const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
				  filePath: tempFilePaths[0],
				  name: 'file',
				  formData: {
					'user': 'test'
				  },
				  success (res){
					const data = res.data
					//do something
				  }
			})
		  }
		})

>	>  云存储

>	>  iviewUI的引入

	` npm install iview --save`
    
### 第四个页面
> ![index.wxml](/miniprogram/images/my.jpg)

>	在微信端获取用户信息
	
	wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
