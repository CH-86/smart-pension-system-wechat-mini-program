// pages/login.js
const api = require('../../config/api');


Page({
    /**
     * 页面的初始数据
     */
    data: {
        loginForm: true,
        phone:'13157797730',//'',//
        password:'1233',//'',//
        errMsgPassword:"",
        name:""
    },

    register: function(){
        wx.redirectTo({
            url: '../register/register'//'../register/register',
        })
    },

    userSubmit: function(){
        // console.log(this.data.phone)
        // console.log(this.data.password)
        var that = this
        wx.request({
            url:api.UserLogin,
            data:{
                phone:this.data.phone,
                password:this.data.password
            },
            method:'POST',
            success (res) {
                if(res.data.message){
                    console.log(res.data.message)
                    that.setData({errMsgPassword : res.data.message}) 
                    return true
                }
                else{
                    wx.setStorage({
                        key: 'token',
                        data: res.data.token
                    })
                    wx.setStorage({
                        key: 'name',
                        data: res.data.name
                    })
                    wx.setStorage({
                        key: 'userId',
                        data:res.data.userId
                    })
                    wx.switchTab({
                        url: '../index/index',
                    })   
                }            
            }
        })
        this.data.loginForm = false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        if(options.phone && options.password){
            console.log(options.phone)
            console.log(options.password)
            this.setData({
                phone: options.phone,
                password: options.password
            })
        }
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})