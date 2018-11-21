var store = require('store');
var path = require('../config/path')
var API = require('../config/api.js');
var ajax = require('ajax');
var url = path.ACTIVE + '/api/test_jwttoken.ashx?q='
module.exports = {
    getToken: function(){
        return store.get('token') || ''
    },
    login: function(userName,userPwd){
        ajax({
            url : url + 'Login',
            data:{
                UserName: userName,
                UserPwd:userPwd
            },
            success: function(data){
                if(data.code === 0){
                    store.set('token',data.content)
                }else{
                    console.log(data.message)
                }
            }
        })
    },
    verifiedToken: function(){
        return ajax({
            url : url + 'VerifiedToken',
            data:{
                ApiToken: this.getToken()
            }
        })
    },
    refreshToken: function(){
        return ajax({
            url : url + 'RefreshToken',
            data:{
                ApiToken: this.getToken()
            }
        })
    },
    quit: function(){
        
        ajax({
            url : url + 'Quit',
            data:{
                ApiToken: this.getToken()
            },
            success:function(data){
                if(data.code === 0){
                    store.set('token','')
                    
                }
            }
        })
    }
}