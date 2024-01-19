export interface UserToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
}

export interface User {
  email?: string;
  phone?: string;
  nickname?: string;
  avatar?: string;
  nonInitPwd?: boolean;
}

export interface UserInfo {
  user?: User;
  roles?: Array<string>;
}

export interface SocialRegisterDTO {
  type?: string;
  code?: string;
  phone?: string;
  avatar?:string;
  nickname?:string;
  phoneCode?: string;
}

export enum SocialTypeEnums {
  SMS = "sms",
  WECHAT = "wechat",
  MINI_PROGRAM = "miniprogram",
}