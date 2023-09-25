// pages/user/info/info.js
const api = require('../../../config/api');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        info:"",
        userPhone:"",
        token:"",
        infoName:{},
        OnInput:false,
        Onkey:"",
        inputValue:"",

        condition:true
    },

    return(){
        wx.switchTab({
            url: '../../my/my',
          })      
    },

    getInfo(){
        wx.getStorage({
            key: 'token',
            success: (res) => {
                this.setData({
                    token: res.data
                },
                wx.request({
                    url:api.GetInfoName,
                    method:'GET',
                    header:{token:res.data},
                    success:(_res) =>{
                        //console.log(_res.data[0].nameInfo)
                        this.setData({
                            infoName: _res.data[0].nameInfo
                        })
                    }
                })
            )
            }
        })
        wx.getStorage({
            key: 'name',
            success: (res) => {
              this.setData({
                userPhone: res.data
            })
            wx.request({
                url:api.GetInfo,
                method:'GET',
                data: { phone: res.data },
                success: (_res) => {
                  // success
                //   console.log(_res.data)
                  this.setData({
                    info: _res.data
                  })
                }
            })
            }
        })
    },

    updateValue(){
        var that = this
        console.log("updateValue "+ this.data.inputValue + " " + this.data.Onkey + " " + this.data.token)
        wx.request({
            url:api.SetInfo,
            method:'POST',
            data:{
                key:this.data.Onkey,
                value:this.data.inputValue,
                phone: this.data.userPhone
            },
            header:this.data.token,
            success:(_res) =>{
                console.log(_res.data)
                // if(_res.data.modifiedCount == 1){
                //     that.setData({
                //         info.: that.data.inputValue
                //     })
                // }
                that.setData({
                    inputValue:""
                })
                that.getInfo()
                // wx.startPullDownRefresh({
                //   success: (res) => {},
                // })
                // onPullDownRefresh
                //wx.onPullDownRefresh()
                // wx.startPullDownRefresh()
                // wx.stopPullDownRefresh()
                //this.onLoad()
                // that.onLoad() // 无效
            }
        })
    },

    changeCondition(){
        this.setData({
           condition: ! this.data.condition
        })
        console.log("hello" + this.data.condition)
    },

    changeInput(event){
        this.setData({
            OnInput : ! this.data.OnInput,
            Onkey : event.currentTarget.dataset.key
        })
        console.log(this.data.OnInput)
        console.log("key is "+ this.data.Onkey)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getInfo()
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