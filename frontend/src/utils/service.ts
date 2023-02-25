import { ILogin } from "./interfaces";
import { LoginResponseSchema } from "./zodSchemas";

function delay(time = 100) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Service {
  static async login(loginInformation: ILogin) {
    try {
      const res = await delay();
      const data = LoginResponseSchema.parse(res);
      return data;
    } catch (e: any) {
      return {
        isSuccess: false,
        message: e.issues[0].message,
      };
    }
  }
}
