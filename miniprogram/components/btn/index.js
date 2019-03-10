// components/btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   openType:null
  },
  options: {
   multipleSlots: true // 在组件定义时的选项中启用多slot支持
 },
  /**
   * 组件的初始数据
   */
  data: {
   rawData:Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
   getUserInfo(e){
    this.triggerEvent('userInfo',{rawData:e.detail.rawData},{})
   }
  }
})
