// pages/order/order.js
const api = require('../../config/api');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '',
        show: false,
        status:["已取消" ,"待受理" ,"受理中" ,"已完成"],
        order:[],
        token:"",
        userId:"",
        nullDate:"",
        type:"体检",
        inText:"",
    },

    onChange(event){
        // console.log(event.detail.name)
        this.setData({
            type: event.detail.name
        })
        // console.log('type is '+this.data.type)
    },

    onDisplay() {
        this.setData({ show: true });
      },
      onClose() {
        this.setData({ show: false });
      },
      formatDate(date) {
        date = new Date(date);
        var year = date.getYear() + 1900
        var month = (date.getMonth()< 9 ? '0':'') + ( date.getMonth() + 1 )
        var day = (date.getDate() < 10 ? '0': '') + date.getDate()
        return `${year}-${month}-${day}`;
      },
      onConfirm(event) {
        this.setData({
          show: false,
          date: this.formatDate(event.detail),
          nullDate:"",
        });
      },

    getUserId(){
        wx.getStorage({
            key: 'userId',
            success: (res) => {
                this.setData({
                    userId: res.data
                })
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
            } 
        })       
    },

    yuyue(){
        //    {
//        "userId":"621907809928fd72b043dfdc",
//            "type": "体检",
//            "date":"2022-03-06",
//            "info":""
//    }
        var info = null
        if(this.data.type =='咨询' ){
            info = {inText: this.data.inText}
        }

        if(this.data.type =='护理' ){
            info = {need: this.data.inText}
        }

        if(this.data.type == '咨询'){
            this.data.date =this.formatDate(new Date)
        }

        if(this.data.date != ""){
            var temp = new Date(this.data.date)
            temp.setHours((new Date).getHours())
            temp.setSeconds((new Date).getSeconds())
            temp.setMinutes((new Date).getMinutes())
            console.log(temp)

            wx.request({
              url: api.AddOrder,
              method:"POST",
              header:{token: this.data.token},
              data:{
                userId:this.data.userId,
                date:temp, // 时间转换UTC
                type: this.data.type,
                info: info,
              },
              success:(res) =>{
                  console.log(res.data)
                    wx.navigateTo({
                        url: '../user/order/order'
                    })
              }
            })
        }
        else{
            this.setData({
                nullDate:"* 日期不能为空"
            })
        }
    },

    // getOrder(){
    //     // console.log('getOrder '+this.data.token)
    //     // console.log('getOrder '+this.data.userId)
    //     wx.request({
    //         url:api.GetOrder,
    //         method:'GET',
    //         header:{token:this.data.token},
    //         data: { userId: this.data.userId },
    //         success:(_res) =>{
    //             console.log(_res.data)
    //             this.setData({
    //                 order: _res.data
    //             })
    //         }
    //     })
    // },

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