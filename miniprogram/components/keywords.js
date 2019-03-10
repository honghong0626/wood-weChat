import {HTTP} from '../untils/http-p.js'
class keywordsModel extends HTTP {
 key='q'
 maxLength=10
 //获取历史从stroage
 getHistory(){
  let keyArray=  wx.getStorageSync(this.key);
  if(!keyArray){
   return []
  }
  return keyArray
 }
 //获取最热门http
 getHot(){
  return this.request({url:'/book/hot_keyword'})
 }

 //存储搜索的关键词
 addKeywords(keywords){
  //先判断是历史纪录是否存在此关键词
  let keyArray=this.getHistory()
  if(!keyArray.includes(keywords)){
   const length= keyArray.length
   if(length>this.maxLength){
    keyArray.pop()
   }
    keyArray.unshift(keywords)
    wx.setStorageSync(this.key, keyArray)
  }
  
 }
}
export {keywordsModel}