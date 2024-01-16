import Router from "@/router/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: "0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onLoginClick(){
    Router.toLogin()
  },

  onTabChange(event: WechatMiniprogram.TouchEvent) {
    this.setData({ active: event.detail });
  }
})