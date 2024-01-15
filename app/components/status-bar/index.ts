// components/status-bar/index.ts
Component({
  options: {
    styleIsolation: "shared"
  },

  /**
   * 组件的属性列表
   */
  properties: {
    color: {
      type: String,
      value: "#00000000"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0
  },

  lifetimes: {
    attached() {
      wx.getSystemInfo({
        success: (result) => {
          this.setData({
            statusBarHeight: result.statusBarHeight
          })
        },
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})