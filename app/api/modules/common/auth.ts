import { Http } from "../../net/index"
import { R } from "../../net/types"
import { UserToken, SocialRegisterDTO } from "../../../model/security"
import { authStore } from "../../../store/index"
import {global} from "@/config/index"

export function MiniProgramLogin(code: string): Promise<R<UserToken>> {
  return Http.post<UserToken>({
    url: "/auth/oauth2/token",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${global.BasicToken}`
    },
    data: {
      grant_type: "social",
      social_type: "app_miniprogram",
      social_code: code,
      user_type: "1",
      org: global.Tenant
    },
    manualProcessingFailure: true
  })
}

export function RefreshToken() {
  return Http.post<UserToken>({
    url: "/auth/oauth2/token",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${global.BasicToken}`
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: authStore.getRefreshToken(),
    },
    manualProcessingFailure: true
  })
}

export function SocialRegister(params: SocialRegisterDTO) {
  return Http.post({
    url: "/pms/v1/app/auth/register/social",
    data: params,
    permit: true,
    manualProcessingFailure: true
  })
}