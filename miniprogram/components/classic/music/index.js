// components/classic/music/index.js
import {
  classicBeh
} from '../classic-behavior.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },
  behaviors: [classicBeh],
  /**
   * 组件的初始数据
   */
  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },
  data: {
    play: false,
    tagUrl: "images/music@tag.png",
    playImg: "images/player@play.png",
    pauseImg: "images/player@pause.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    togglePlay() {
      if (!this.data.play) {
        this.setData({
          play: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          play: false
        })
        mMgr.pause()
      }

    },

    /**移除当前播放图标状态 */
    _recoverStatus: function() {
      //音频暂停要恢复
      if (mMgr.paused) {
        this.setData({
          play: false
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        //如果当前期刊和当前的音乐相同时需要将按钮恢复
        this.setData({
          play: true
        })
      }
    },
    /**监听系统和控制器是否是一样的 */
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})