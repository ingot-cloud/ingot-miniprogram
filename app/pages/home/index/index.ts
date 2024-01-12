// pages/home/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onTabChange(event: WechatMiniprogram.TouchEvent) {
    this.setData({ active: event.detail });
  }
})