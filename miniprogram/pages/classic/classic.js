// miniprogram/pages/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let ClassicModels = new ClassicModel();
let LikeModels = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    like_status: false,
    fav_nums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   wx.showLoading({
    title: '加载中',
  });
    ClassicModels.getLatest(res => {
      this.setData({
        classic: res,
        first: ClassicModels.isFirst(res.index),
        latest: ClassicModels.isLatest(res.index),
        fav_nums: res.fav_nums,
        like_status: res.like_status
      })
      wx.hideLoading({
       title: '加载中',
     });
    });
  },
  /**like自定义事件 */
  onLike: function(event) {
    let behavior = event.detail.behavior;
    LikeModels.onLike(behavior, this.data.classic.id, this.data.classic.type)
  },
  /**
   * navi自定义事件
   */
  toNext: function(event) {
    this._updateClassic("next")
  },
  toPrev: function(event) {
    this._updateClassic("previous")
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index;
    ClassicModels.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        first: ClassicModels.isFirst(res.index),
        latest: ClassicModels.isLatest(res.index)
      })
    })
  },
  _getLikeStatus: function(artId, category) {
    LikeModels.getLikeStatue(artId, category, (res) => {
      this.setData({
        fav_nums: res.fav_nums,
        like_status: res.like_status
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})