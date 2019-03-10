import {HTTP} from '../untils/http-p.js'

export class ClassicModel extends HTTP {
  // 获取最新一期
  getLatest(sCallBack){
  this.request({url:"/classic/latest"}).then(res=>{
      let key = this._getKey(res.index)
      wx.setStorageSync(key, res)
      wx.setStorageSync("latestIndex", res.index)//将最新的index存入缓存
      sCallBack(res)
    })
  }

  //toPrev获取当前上一期刊 or toNext获取当前下一期期刊
  getClassic(index, nextOrPrevious,sCallback){
    let key  = nextOrPrevious == "next" ? this._getKey(index+1):this._getKey(index-1) //获取需要查询期刊数
    let classic = wx.getStorageSync(key)//查询是否存在缓存
    if (!classic){
      this.request({url:`/classic/${index}/${nextOrPrevious}`}).then(res=>{
        sCallback(res)
        wx.setStorageSync("classic-" + res.index, res)//将每期期刊缓存
      })
    }else{
      sCallback(classic)
    }
  }
 
  //判断是否是第一期
  isFirst(index){
    let first = index==1?true:false;
    return first
  }
  //判断是否是最新一期
  isLatest(index){
    let latestIndex = wx.getStorageSync("latestIndex");
    let latest = index==latestIndex?true:false
    return latest
  }
  //判断是否存在缓存
  _getKey(index){
    let key="classic-"+index;
    return key
  }

}
