// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached(){
   wx.getSystemInfo({
    success(res) {
      // console.log(res.windowWidth)
      // console.log(res.windowHeight)
    }
  })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail:function(){
      wx.navigateTo({
        url: "../../pages/book-detail/book-detail?bid="+this.properties.book.id,
      })
    }
  }
})
