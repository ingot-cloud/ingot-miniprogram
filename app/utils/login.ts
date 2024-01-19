import { UserInfo } from "@/model/index"
import { authStore } from "@/store/index"

class Login {

  doLoginIfNeed() {
    if (authStore.isLogin()) {
      return false
    }
    this.toLogin()
    return true
  }

  toLogin() {
    const pages = getCurrentPages()
    if (pages.length > 0) {
      const current = pages[pages.length - 1]
      if (current.route == '/pages/security/login/index') {
        return
      }
    }
    wx.navigateTo({
      url: "/pages/security/login/index"
    })
  }

  logout() {
    authStore.clear()
    wx.reLaunch({
      url: '/pages/tab/index/index'
    });
  }

  doWeichatLogin() {
    return new Promise<UserInfo>((resolve, reject) => {
      wx.login({
        success: (res) => {
          authStore.fetchUserToken(res.code).then(() => {
            authStore.fetchUserInfo().then(data => {
              resolve(data)
            }).catch(err => {
              reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        },
        fail: () => {
          reject()
        }
      })
    })
  }

  doRegisterAndLogin(phoneCode: string) {
    return new Promise<void>((resolve, reject) => {
      wx.login({
        success: (res) => {
          authStore.doRegister({
            phoneCode,
            code: res.code
          }).then(() => {
            this.doWeichatLogin().then(() => {
              resolve()
            }).catch(((err) => {
              reject(err)
            }))
          }).catch(err => {
            reject(err)
          })
        },
        fail: () => {
          reject()
        }
      })
    })
  }
}

export const LoginUtils = new Login()