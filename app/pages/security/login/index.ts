import { Message, LoginUtils } from "@/utils/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "登录",

    showGetPhoneNumberActions: false,
    getPhoneNumberActions: [{
      name: '点击获取',
      subname: "授权微信手机号完成登录",
      openType: 'getPhoneNumber'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 前台一键登录
   */
  onAppLogin() {
    const loading = Message.loading("加载中...")
    LoginUtils.doWeichatLogin().then(() => {
      loading.clear()
      wx.navigateBack()
    }).catch(err => {
      loading.clear()
      if (!err) {
        Message.fail("微信登录失败")
        return
      }
      if (err.code == "S0400") {
        // 登录失败，提示授权手机号
        this.setData({
          showGetPhoneNumberActions: true
        })
        return
      }
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    })
  },


  onBindGetPhoneNumber(e: WechatMiniprogram.TouchEvent) {
    const code = e.detail.code
    if (!code) {
      wx.showToast({
        title: '请授权手机号完成登录',
        icon: 'none',
        duration: 2000
      });
      return
    }
    this.setData({
      showGetPhoneNumberActions: false,
    })

    const loading = Message.loading("加载中...")
    LoginUtils.doRegisterAndLogin(code).then(() => {
      loading.clear()
      wx.navigateBack()
    }).catch(err => {
      loading.clear()
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    })
  },

  onGetPhonNumberActionClose() {
    this.setData({
      showGetPhoneNumberActions: false
    })
  },

})