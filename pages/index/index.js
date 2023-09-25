// index.js
// 获取应用实例
//const app = getApp()

Page({
  data: {
    background: ["https://421886.s81i.faiusr.com/2/101/AFEI-t8ZEAIYACDBnOHkBSjEqexJMO4FOOgCQGU.jpg", "https://421886.s81i.faiusr.com/2/101/AFEI-t8ZEAIYACDDnOHkBSiQnKSUAzDuBTjoAkBl.jpg"],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 6000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    noticeList: [],
    notice:"暂无消息"
    // motto: 'Hello World123',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  naviToRegeo: function (e) {
    wx.navigateTo({
      url: '../map/regeo/regeo'
    })
  },
  naviToWeather: function (e) {
    wx.navigateTo({
      url: '../map/weather/weather'
    })
  },
  naviToPoi: function (e) {
    wx.navigateTo({
      url: '../map/poi/poi'
    })
  },
  naviToStatic: function(){
    wx.navigateTo({
      url: '../map/staticmap/staticmap'
    })
  },
  naviToNavi: function(){
    wx.navigateTo({
      url: '../map/navigation_car/navigation'
    })
  }

  // // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad() {
  //   if (wx.getUserProfile) {
  //     this.setData({
  //       canIUseGetUserProfile: true
  //     })
  //   }
  // },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
