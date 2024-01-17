enum Env {
  Dev = "1",
  CompanyDev = "2",
  Release = "9"
}

export const global = {
  AppVersion: "v1.0.0",
  Env: Env.Release,
  Tenant: "1",
  BasicToken: "aW5nb3Q6aW5nb3Q=",
  BaseUrl: (): string => {
    switch (global.Env) {
      case Env.CompanyDev:
        return "http://192.168.1.22:7980"
      case Env.Dev:
        return "http://192.168.31.114:7980"
      case Env.Release:
        return "https://api.ingotcloud.top"
    }
  },
  ReqestTimeout: 10_000
}

