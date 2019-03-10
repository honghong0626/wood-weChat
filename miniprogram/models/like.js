import {
  HTTP
} from '../untils/http-p.js'
class LikeModel extends HTTP {
  // 取消或者点赞
  onLike(behavior, artId, category) {
    let url = behavior == "like" ? "/like" : "/like/cancel"
    return this.request({
      url:url,
      method:"POST",
      data: {
        art_id: artId,
        type: category
      }
    })
  }
  //获取期刊点赞信息
  getLikeStatue(artId, category, sCallback) {
    this.request({url: `/classic/${category}/${artId}/favor`}).then(res=>{
      sCallback(res)
    })
  }
  //获取书籍点赞信息
  getBookStatus(bid){
   return this.request({url:`/book/${bid}/favor`})
  }
}
export {
  LikeModel
}