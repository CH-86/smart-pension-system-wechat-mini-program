// pages/user/healthy/healthy.js
const api = require('../../../config/api');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeName: '',
        token:"",
        userId:"",
        cases:[],
        casesInfo:{}
    },
    onChange(event) {
        // console.log(event)
        this.setData({
          activeName: event.detail,
        });
      },

      return(){
        wx.switchTab({
            url: '../../my/my',
          })      
    },


    checkTypeIsString(data){
        console.log(data)
        console.log(typeof data)
        return typeof data === 'string'
    },

    getToken(){
        wx.getStorage({
            key: 'token',
            success: (res) => {
                this.setData({
                    token: res.data
                }),
                wx.request({
                    url:api.GetCasesInfo,
                    method:'GET',
                    header:{token:res.data},
                    success:(_res) =>{
                        //console.log(_res.data[0])
                        this.setData({
                            casesInfo: _res.data[0]
                        })
                    }
                })                
            } 
        })       
    },

    getUserId(){
        wx.getStorage({
            key: 'userId',
            success: (res) => {
                this.setData({
                    userId: res.data
                })
                //console.log('getUserId '+ this.data.userId)
            } 
        })   
    },

    getCases(){
        wx.request({
            url:api.GetCases +"?id=" + this.data.userId,
            method:'GET',
            header:{token:this.data.token},
            success:(_res) =>{
                //console.log(_res.data)
                this.setData({
                    cases: _res.data
                })
            }
        })
    },

    getCasesInfo(){
   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getToken()
        this.getUserId()
        //this.getCasesInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getCases()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})