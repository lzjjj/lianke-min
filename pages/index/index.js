//index.js
//获取应用实例
const app = getApp()
import requestUrl from "../../common/api.js"
Page({
  data: {
    indicatorDots: false,
    interval: 3000,
    duration: 500,
    autoplay: true,
    companyInfo:"",
    carouselPic:"",
    aboutUsPic:"",
    findUsPic:"",
    isShowAbout: false,
  },

  onLoad: function () {
    
    this.getCompanyInfo();
   
   
  },
  
  //获取信息接口
  getCompanyInfo(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url:requestUrl.getInfo,
      success:(res)=>{
        if(res.data.success){
          this.setData({
            companyInfo:res.data.obj
          })
          this.getCarouselPic();
          this.getAboutUsPic();
          this.getFindUsPic();
        }
      }
    })
  },

  //获取轮播图片
  getCarouselPic(){
    wx.request({
      url: requestUrl.getPic +"?picloc=1",
      success: (res) => {
        if (res.data.success) {
          this.setData({
            carouselPic: res.data.obj
          })
        }
      }
    })
  },

  //获取关于我们图片
  getAboutUsPic() {
    wx.request({
      url: requestUrl.getPic + "?picloc=2",
      success: (res) => {
        if (res.data.success) {
          this.setData({
            aboutUsPic: res.data.obj
          })
        }
      }
    })
  },
  //获取发现我们图片
  getFindUsPic() {
    wx.request({
      url: requestUrl.getPic + "?picloc=3",
      success: (res) => {
        if (res.data.success) {
          this.setData({
            findUsPic: res.data.obj
          })
        }
      }
    })
    wx.hideLoading();
  },

  //展示大图
  showPreviewImg(e) {
    let imgUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [imgUrl],
    })
  },

  //切换tab
  switchTab(e) {
    let id = e.currentTarget.dataset.id;
    if (id == 0) {//0表示isShowAbout:false;1表示isShowAbout:true;
      this.setData({
        isShowAbout: false
      })
    } else {
      this.setData({
        isShowAbout: true
      })
    }
  },
  // onPullDownRefresh() {
  //   wx.showNavigationBarLoading()
  //   this.onLoad();
  //   wx.hideNavigationBarLoading() //完成停止加载
  //   wx.stopPullDownRefresh();
  // },
  onShareAppMessage() {

  }

})
