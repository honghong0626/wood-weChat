// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favorites:{
     type:Object,
     observer:function(value){
      if(value){
       var typeText={
        100: "电影",
        200: "音乐",
        300: "句子"
       }[value.type]
      }
      this.setData({
       typeText
      })
     }
    },
    typeText:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
