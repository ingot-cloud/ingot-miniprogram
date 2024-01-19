import { Http } from "@/api/net/index"
import { R } from "@/api/net/types"
import { UserInfo, SysUser } from "@/model/index"

export function UserInfoAPI(): Promise<R<UserInfo>> {
  return Http.get<UserInfo>({
    url: "/pms/v1/app/user",
  })
}

export function UpdateUserInfoAPI(params: SysUser) {
  return Http.put<void>({
    url: "/pms/v1/app/user",
    data: params
  })
}