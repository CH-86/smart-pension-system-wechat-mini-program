// pages/register/register.js

const api = require('../../config/api');

const citys = {
    浙江省: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市'],
    福建省: ['福州市', '厦门市', '莆田市', '三明市', '泉州市'],
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:"",
        password:"",
        sex:"1",
        name:"",        
        IDcard:"",
        show: false,
        address:"",
        addressInfo:"",

        errMsgPhone:"",
        errMsgPassword:"",
        errMsgIDcard:"",
        errMsgName:"",
        errMsgAddressInfo:"",

        code:"",
        columns: [
            {
              values: Object.keys(citys),
              className: 'column1',
            },
            {
              values: citys['浙江省'],
              className: 'column2',
              defaultIndex: 2,
            },
        ],
    },

    checkAddressInfo(){
      if(!this.data.addressInfo){
        this.setData({errMsgAddressInfo:'详细地址不能为空'})
        return false
      }else {
        this.setData({errMsgAddressInfo:''})
        return true
      }
    },

    checkPassword(){
      if (!this.data.password) { //13157797730
        this.setData({errMsgPassword : '密码不能为空！'})  
        return false
      }else{
        this.setData({errMsgPassword : ''}) 
        return true
      }      
    },

    checkName(){
      if(!this.data.name){
        this.setData({errMsgName :'用户名不能为空'})
        return false
      }else if(!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(this.data.name))){
        this.setData({errMsgName :'用户名格式错误'})
        return true
      }else{ //William.Jafferson
        this.setData({errMsgName :''})
        return false
      }
    },

    checkPhone(){
      if (!this.data.phone) { 
        this.setData({errMsgPhone : '手机号码不能为空！'})
        return false
      } else if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.phone))) { //13157797730
        this.setData({errMsgPhone : '手机号格式不正确！'})
        return false
      } else {
        this.setData({errMsgPhone : '',code:""})
        return true
      }
    },

    checkIDcard(){
      if(!this.data.IDcard){
        this.setData({errMsgIDcard : '身份不能为空'})
        return false        
      }else if (!(/(\d{15}$)|(\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.IDcard))){
        this.setData({errMsgIDcard : '身份证号码有误'})
        return false
      } else{
        this.setData({errMsgIDcard : ''})
        return true
      }
    },

    registerSubmit(){
        var data = {
            phone: this.data.phone,
            password: this.data.password,
            info:{
                name: this.data.name,
                sex:this.data.sex,
                address: this.data.address + this.data.addressInfo,
                id:this.data.IDcard
            }
        };

        var that =  this 
        wx.request({
          url: api.AddUser,
          method: 'POST',
          data: data,
          success:(res) =>{
            console.log(res.data)
            if(res.data.code){
                that.setData({code: res.data.code})
            }
            if(res.data.id){
              wx.navigateTo({
                url: '../login/login?phone='+res.data.phone+'&password='+res.data.password,
              })              
            }
          } 
        })
    },

    exit(){
      wx.navigateTo({
        url: '../login/login',
      })
    },

    onChange(event) {
        const { picker, value, index } = event.detail;
        picker.setColumnValues(1, citys[value[0]]);
        value.splice(0,1) // 只取市
        console.log(value);
        this.setData({
            address: value,
            show: false
        })
        
      },

    onClose() {
        this.setData({ show: false });
    },

    onConfirm(event) {
        this.setData({
          show: false,
          date: this.formatDate(event.detail),
          nullDate:"",
        });
      },

    onDisplay() {
        this.setData({ show: true });
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