// pages/my/my.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userPhone:"",
        inputStr: '',//输入字符串
        getStr:'',//后端获取的字符串
        socketStatus: 'closed', //记录websocket连接状态
        SocketTask:null,//socket链接后的对象，可以进行关闭发消息收消息等
        lockReconnect: false,//重连锁，防止重复连接
        wsCreateHandler: null,//重连时间句柄
        timeoutObj:null,//心跳检测时间句柄
        serverTimeoutObj:null,//心跳检测服务器响应时间句柄

        userId:"",
        latitude:"",
        longitude:""
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
    //接收服务器端传送过来的数据,用于页面显示
    extraLine: [],
    //向extraLine添加一条数据
    add() {
        this.extraLine.push(this.getStr)//从服务器获取到的数据
        this.setData({
            text: this.extraLine.join('\n'),
        })
        setTimeout(() => {
        this.setData({
            scrollTop: 99999
        })
        }, 0)
    },

    sos(){
      if (this.socketStatus === 'connected') {
        //点对点发送：一般会给后端传送json数据，包括接收者的id
        let jsonObj = {
            user:this.data.userId,
            message:this.inputStr,
            code:"SOS",
            latitude:this.data.latitude,
            longitude:this.data.longitude,
            time:new Date
        }
        let jsonStr = JSON.stringify(jsonObj)
        this.SocketTask.send({
          data: jsonStr,
        })
      }        
    },

    getUserPhone(){
        wx.getStorage({
            key: 'name',
            success: (res) => {
              // success
              console.log(res.data)
              this.setData({
                userPhone: res.data}
              )
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getUserId()

        let that = this

        // 建立Socket
        if (that.data.socketStatus === 'closed') {
            that.openSocket();
        }
        
        //获取定位
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({key: key});
        
        myAmapFun.getRegeo({
          iconPath: "../../../static/images/marker.png",
          iconWidth: 22,
          iconHeight: 32,
          success: function(data){
            console.log(data)
            that.setData({
              latitude: data[0].latitude,
              longitude: data[0].longitude
            })
          }
        })        
    },
    openSocket() {
        try {
          // 连接后台服务器
          this.SocketTask = wx.connectSocket({
            url: "ws://127.0.0.1:8088/websocket/"+this.data.userPhone,//你的后端地址
          })
        } catch (e) {
          // console.log(e)
          // 服务器重连
          this.ReConnect()
        }
        //连接成功后的操作
        //可以处理一些在线和非在线的情况，比如已经连接可以设置该用户头像高亮显示等等
        this.SocketTask.onOpen(() => {
          console.log('WebSocket 已连接')
          this.startHeartCheck()
          this.socketStatus = 'connected';
        })
        //断开后台服务器的操作
        this.SocketTask.onClose(() => {
          console.log('WebSocket 已断开')
          this.socketStatus = 'closed'
          this.ReConnect()
        })
        //报错时执行
        this.SocketTask.onError(error => {
          this.socketStatus = 'closed'
          this.ReConnect()
        })
        // 监听服务器推送的消息
        this.SocketTask.onMessage(message => {
          console.log(message)
          this.startHeartCheck()
          this.getStr = message.data
          let jsonObj = JSON.parse(this.getStr)
          this.getStr = jsonObj.message
          let res = jsonObj.type
          if (res === "pong")
            return
          this.add()
        })
      },
         
      // 关闭websocket服务
      closeSocket() {
        if (this.socketStatus === 'connected') {
          this.SocketTask.close({
            success: () => {
              this.socketStatus = 'closed'
            }
          })
        }
      },
         
      //发送消息函数
      sendMessage() {
        if (this.socketStatus === 'connected') {
          //群发，没有指定发送对象
          /*
          this.SocketTask.send({
            data: this.data.inputStr  
          })
          */
          //点对点发送：一般会给后端传送json数据，包括接收者的id
          let jsonObj = {
              user:this.data.userPhone,
              message:this.inputStr
          }
          let jsonStr = JSON.stringify(jsonObj)
          this.SocketTask.send({
            data: jsonStr,
          })
        }
      },
      //监听用户输入
      InputStr: function(e) {
        this.inputStr = e.detail.value
      },
      //向服务器发送数据
      btnFun:function(){
        this.sendMessage()
      },
    
      //重连方法
      ReConnect(){
        //如果锁被锁住就直接返回
        if (this.lockReconnect)
          return
        console.log("重新连接...")
        this.lockReconnect = true
        //没有连接上会一直重连，为了防止请求次数过多一般设置等待时间
        this.wsCreateHandler && clearTimeout(this.wsCreateHandler)
        this.wsCreateHandler = setTimeout(()=>{
          this.openSocket()
          this.lockReconnect = false
        },2000)
      },
    
      // 心跳检测部分:网络中断等问题系统无法捕获，需要用心跳检测实现重连
      // 重启心跳检测
      resetHeartCheck(){
        clearTimeout(this.timeoutObj)
        clearTimeout(this.serverTimeoutObj)
        this.startHeartCheck()
      },
      //开启心跳检测定时器
      startHeartCheck(){
        this.timeoutObj && clearTimeout(this.timeoutObj)
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
        this.timeoutObj = setTimeout(()=>{
          console.log("发送ping到服务器")
          try {
            this.SocketTask.send({
              data: "ping"
            })
          } catch(e) {
            console.log("发送ping失败")
          }
          //内嵌计时器，防止刚连上后立刻重连
          this.serverTimeoutObj = setTimeout(()=>{
            //没有收到后台的数据关闭连接后重连
            // this.closeSocket()
            this.ReConnect()
          },150000)
        },150000)
      },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getUserPhone()
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