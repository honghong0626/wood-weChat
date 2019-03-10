// miniprogram/pages/book-detail/book-detail.js
import {
 BookModule
} from '../../models/book.js'
import {
 LikeModel
} from '../../models/like.js'

const BookModules = new BookModule();
const LikeModels = new LikeModel();
Page({

 /**
  * 页面的初始数据
  */
 data: {
  detail: null,
  comments: null,
  like_status: false,
  fav_nums: 0,
  isHidden: true,
  value: null
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  wx.showLoading();
  const bid = this.options.bid;
  const getBookDetail = BookModules.getBookDetail(bid);//获取详情
  const getBookComment= BookModules.getBookComment(bid);//获取短评
  const getBookStatus=LikeModels.getBookStatus(bid);//初始化like
  Promise.all([getBookDetail,getBookComment,getBookStatus]).then(res=>{
   this.setData({
    detail: res[0],
    comments: res[1].comments,
    fav_nums: res[2].fav_nums,
    like_status: res[2].like_status
   })
   wx.hideLoading();
  })
 },
 /**like自定义事件 */
 onLike: function (event) {
  let behavior = event.detail.behavior;
  LikeModels.onLike(behavior, this.data.detail.id, 400)
 },
 /**
  * 显示评论框
  */
 showFake: function () {
  this.setData({
   isHidden: false
  })
 },
 /**隐藏评论框 */
 hiddenFake: function () {
  this.setData({
   isHidden: true
  })
 },
 getValue: function (event) {
  const value = event.detail.value
  this.setData({
   value: value
  })
 },
 /**发送短评 */
 sendComment: function (event) {
  const bid = this.data.detail.id;
  const content = this.data.value || event.detail.text;
  if (!content) {
   return
  }
  BookModules.sendBookComment(bid, content).then(res => {
   this.data.comments.unshift({
    content,
    nums: 1
   })
   this.setData({
    isHidden: true,
    comments: this.data.comments
   })
   wx.showToast({
    title: '短评+1',
    icon: 'none',
    duration: 2000
   })
  })
 },
 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {

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