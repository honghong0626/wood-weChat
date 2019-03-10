import { configApi } from '../configApi.js'
const tips = {
  1: "抱歉出现了一个错误请稍后再试，谢谢！",
  1005: "不正确的开发者key",
  1002: "找不到资源",
  2000: "你已经点过赞了",
  2001: "你还没点过赞",
  3000: "该期内容不存在",
  500:"服务请求数据太慢啦，稍后再试！！！"
}
/* 发送http请求 */
class HTTP {
  //解构参数es6
  request({url,method,data}) {
    const promise = new Promise((resolve,reject)=>{
        this._request(url,resolve,reject,method,data)
    })
    return promise
  }

_request(url,resolve,reject,method="GET",data={}){
  wx.request({
    url: configApi.url +url,
    method: method,
    data: data,
    header: {
      "content-type": "application/json",
      "appkey": "oX5frwRBgZawbZ9A"
    },
    success: res=> {
      let code = res.statusCode.toString()
      if (code.startsWith('2')) {
        resolve(res.data)
      }else if(code.startsWith('5')){
       this._show_error('500')
      }else {
        const error_code = res.data.error_code
        this._show_error(code)
      }

    },
    fail: error=> {
      reject()
      this._show_error(1)
    }
  })
}
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}


export { HTTP }