// components/search/index.js
import {
 keywordsModel
} from '../keywords.js'
import {
 BookModule
} from '../../models/book.js'
//引入behaviors 来监听data的变化
import {
 paginationBev
} from '../paginationBev.js'

const keywordsModels = new keywordsModel();
const BookModules = new BookModule();
Component({
 /**
  * 组件的属性列表
  */
 properties: {},
 /**
  * 组件的初始数据
  */
 data: {
  searching: true, //是否显示热门以及历史
  historys: [],
  hots: [],
  hide: false,
  viewHeight: Number, //容器的高度
  q: '',
  more: true, //是否有更多数据
  scrollTop: 0,
  total: []
 },

 behaviors: [paginationBev],
 lifetimes: {
  attached() {
   //获取热门词以及历史搜索
   keywordsModels.getHot().then(res => {
    this.setData({
     hots: res.hot
    })
   })
   this.setData({
    historys: keywordsModels.getHistory(),
   })
  }
 },
 ready() {
  
 },
 /**
  * 组件的方法列表
  */
 methods: {
  // 输入完成事件
  onConfirm(event) {
   this._setHeight()
   const value = event.detail.value || event.detail.text
   if (!value) {//如果没有关键词则不执行
    return
   } 
   this.setData({
    q: value,
    searching: false
   })
   //加入历史记录
   keywordsModels.addKeywords(value)
   //获取一页数据
   BookModules.hotKeywords(0, 20, value).then(res => {
    this.concatResult(res.books)
    this.data.total=res.total;
    this.noData(res.books)
   })
  },
  //滚动到底之后加载更多 
  moreLoading(e) {
   if (!this.data.more) {
    return;
   }
   var start = this.data.searchResults.length;
   var q = this.data.q;
   this.loading()
   if(this.isMore()){
    this.data.more = false; //避免重复发送请求
    BookModules.hotKeywords(start, 20, q).then(res => {
     this.concatResult(res.books)
     this.loading()
     this.data.more = true;
    })
   }
  },
  // “取消”按钮调用搜索以及book的page
  hiddenSearch() {
   this.triggerEvent('hideSearch', {
    hide: this.properties.hide
   }, {})
  },
  _setHeight() {
   const that = this;
   //获取输入框的高度
   var query = this.createSelectorQuery();
   query.select('.header').boundingClientRect(function (rect) {
    that.setData({
     scrollTop: rect.height
    })
    //设置scroll-view的高度
    wx.getSystemInfo({
    success: function (res) {
     that.setData({
      viewHeight: res.windowHeight - rect.height
     })
    }
   })
   }).exec();
   
  }
 }

})