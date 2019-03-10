import {HTTP} from "../untils/http-p.js"

export class BookModule extends HTTP{
  // 获取书籍列表
  getBooks(){
    return this.request({
      url:'/book/hot_list'
    })
  }
  //获取书籍详细信息
  getBookDetail(bid){
    return this.request({
      url:`/book/${bid}/detail`
    })
  }
  //获取书籍短评
  getBookComment(bid){
    return this.request({
      url:`/book/${bid}/short_comment`
    })
  }
  //发送短评
  sendBookComment(bid,content){
   return this.request({
    url:'/book/add/short_comment',
    method:'POST',
    data:{
     book_id:bid,
     content:content
    },
   })
  }

 //书籍关键词搜索
 hotKeywords(start,count,q){
  return this.request({
   url:'/book/search',
   data:{
    start,
    count,
    summary:1,
    q
   }
  })
 }
}