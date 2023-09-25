const ApiRootUrl = 'http://127.0.0.1:8088/';

module.exports = {
    UserLogin: ApiRootUrl + 'user/login',
    GetInfo: ApiRootUrl + 'user/info/all',
    GetInfoName: ApiRootUrl + 'admin/getTags'+'?type=' + 'userInfo',
    GetCasesInfo: ApiRootUrl + 'admin/getTags'+'?type=' + 'cases',
    SetInfo: ApiRootUrl +"user/info/set",
    GetOrder: ApiRootUrl + "user/allOrder",
    AddOrder: ApiRootUrl + "user/addOrder",
    CancelOrder: ApiRootUrl + "user/cancelOrder",
    GetCases: ApiRootUrl + "user/cases/all",
    AddUser: ApiRootUrl + "user/user/add"
}