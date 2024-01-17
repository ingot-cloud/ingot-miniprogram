import { UserToken, UserInfo, User } from "@/model/index"
import { MiniProgramLogin, RefreshToken } from "@/api/modules/common/auth"

class AuthStore {

  setUserToken(token: UserToken) {
    wx.setStorageSync('security.token', token)
  }

  setUserInfo(info: UserInfo) {
    wx.setStorageSync('security.user', info)
  }

  getAccessToken(): string {
    const userToken = wx.getStorageSync<UserToken>('security.token')
    if (userToken) {
      return `${userToken.tokenType} ${userToken.accessToken}`
    }
    return ""
  }

  getRefreshToken(): string {
    const userToken = wx.getStorageSync<UserToken>('security.token')
    if (userToken && userToken.refreshToken) {
      return userToken.refreshToken
    }
    return ""
  }

  getUserInfo(): User {
    const userInfo = wx.getStorageSync<UserInfo>('security.user')
    if (userInfo && userInfo.user) {
      return userInfo.user
    }
    return { nickname: "点击登录" }
  }

  isLogin(): boolean {
    const userInfo = wx.getStorageSync<UserInfo>('security.user')
    return Boolean(userInfo && userInfo.roles)
  }

  fetchUserToken(code: string) {
    return new Promise<UserToken>((resolve, reject) => {
      MiniProgramLogin(code).then(response => {
        authStore.setUserToken(response.data)
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  fetchRefreshUserToken() {
    return new Promise<UserToken>((resolve, reject) => {
      RefreshToken().then(response => {
        authStore.setUserToken(response.data)
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  clear() {
    wx.removeStorageSync("security.token")
    wx.removeStorageSync("security.user")
  }

}

export const authStore = new AuthStore()