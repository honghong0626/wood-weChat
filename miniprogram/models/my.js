import {HTTP} from '../untils/http-p.js'
class myModel extends HTTP {
 //favorites加载
 favLoading(){
  return this.request({
   url:'/classic/favor'
  })
 }
 //获取书籍点赞数量
 likeBookCount(){
  return this.request({
   url:"/book/favor/count"
  })
 }
 
}
export {myModel}