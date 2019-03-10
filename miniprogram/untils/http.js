import {configApi} from '../configApi.js'
const tips = {
  1:"抱歉出现了一个错误请稍后再试，谢谢！",
  1005:"不正确的开发者key",
  1002:"找不到资源",
  2000:"你已经点过赞了",
  2001:"你还没点过赞",
  3000:"该期内容不存在"
}
/* 发送http请求 */
class HTTP{
  request(params){
    if(!params.method){
      params.method ="GET";
    }
    wx.request({
      url:configApi.url+params.url,
      method:params.method,
      data:params.data,
      header:{
        "content-type":"application/json",
        "appkey":"oX5frwRBgZawbZ9A"
      },
      success:function(res){
       let code = res.statusCode.toString()
       if(code.startsWith('2')){
        params.success && params.success(res.data)
       }else{
        let error_code = res.data.error_code
        this. _show_error(code)
       }
        
      },
      fail:function(error){
        this. _show_error(1)
      }
    })
  }

  _show_error(error_code){
   if(!error_code){
    error_code =1 
   }
   let tip = tips[error_code]
   wx.showToast({
    title: tip?tip:tips[1], 
    icon:'none',
    duration:2000
}) 
  }
}


export {HTTP}