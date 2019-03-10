// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    unlike:{
      type: Boolean 
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesLike:"images/like.png",
    noLike:"images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(){
      let unlike=this.properties.unlike;
      let count = this.properties.count;
      count = unlike?count-1:count+1;
      this.setData({
        unlike:!unlike,
        count:count
      })
     let behavior = this.properties.unlike?"like":"cancel"//是点赞还是取消点赞
     this.triggerEvent('like',{behavior:behavior})//触发自定义事件
    }
  }
})
