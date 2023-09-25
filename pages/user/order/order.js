// pages/user/order/order.js
const api = require('../../../config/api');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        steps: [
            {
              text: "待受理" ,
              desc: '等待接单',
            },
            {
              text: "受理中" ,
              desc: '等待处理',
            },
            {
              text: "已完成",
              desc: '订单完成',
            }
        ],
        active:0,
        status:["已取消" ,"待受理" ,"受理中" ,"已完成"],
        order:[],
        token:"",
        userId:"",
    },

    // imageURL(type){
    //     console.log(type)
    //     return "//www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png"
    // },

    onChange(event){
        //console.log(event.detail.index)
        this.setData({
            active: event.detail.index
        })
    },

    cancel(event){
        //console.log(event.target.dataset)
        wx.request({
          url: api.CancelOrder+ "?id="+ event.target.dataset.id,
          method:"GET",
          header:{token: this.data.token},
          success:(res) => {
            console.log(res.data)
            this.getOrder()
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

    getToken(){
        wx.getStorage({
            key: 'token',
            success: (res) => {
                this.setData({
                    token: res.data
                })
                //console.log('getToken '+  this.data.token)
            } 
        })       
    },

    getOrder(){
        // console.log('getOrder '+this.data.token)
        // console.log('getOrder '+this.data.userId)
        wx.request({
            url:api.GetOrder,
            method:'GET',
            header:{token:this.data.token},
            data: { userId: this.data.userId },
            success:(_res) =>{
                console.log(_res.data)
                this.setData({
                    order: _res.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getToken()
        this.getUserId()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {


        this.getOrder()
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