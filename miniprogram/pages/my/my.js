// miniprogram/pages/my/my.js
import {
 myModel
} from '../../models/my.js'
const mymodels = new myModel()
Page({

 /**
  * 页面的初始数据
  */
 data: {
  favorites: Array,
  nickName: null,
  rawData: null,
  isSetting: false,
  count: 0
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
 
 },
 //授权成功之后需要处理数据
 getUserInfo: function (res) {
  this.setData({
   rawData: JSON.parse(res.detail.rawData),
   isSetting: true
  })
 },
 //进入页面发送请求加载喜欢的
 getFavorites: function () {
  mymodels.favLoading().then(res => {
   this.setData({
    favorites: res
   })
  })
 },
 likeBookCount: function () {
  mymodels.likeBookCount().then(res => {
   this.setData({
    count: res.count
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
  this.getFavorites()
  this.likeBookCount()

  //先判断用户是否存在
  wx.getUserInfo({
   success: res => {
    this.setData({
     rawData: JSON.parse(res.rawData),
     isSetting: true
    })
   },
   fail: res => {
    this.setData({
     isSetting: false
    })
   }
  })
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