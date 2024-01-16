class Router {
  toLogin() {
    wx.navigateTo({
      url: `/pages/security/login/index`
    })
  }
}

export default new Router()