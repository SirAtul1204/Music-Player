import { ILogin, IRegister } from "./interfaces";
import {
  DeleteMusicResponseSchema,
  GetMusicResponseSchema,
  LoginResponseSchema,
  RegisterResponseSchema,
} from "./zodSchemas";

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

  static async register(registerInformation: IRegister) {
    try {
      const res = await delay();
      const data = RegisterResponseSchema.parse(res);
      return data;
    } catch (e: any) {
      return {
        isSuccess: false,
        message: e.issues[0].message,
      };
    }
  }

  static async getAllMusic(userId: string) {
    try {
      const res = {
        message: "All music fetched",
        isSuccess: true,
        musics: [
          {
            id: "1",
            name: "Suzume",
            description: "Hello World",
            coverAlbum: "Singh",
            artistName: "Atul",
            isPlaying: false,
          },
          {
            id: "2",
            name: "Suzume",
            description: "Hello World",
            coverAlbum: "Singh",
            artistName: "Atul",
            isPlaying: true,
          },
        ],
      };

      const data = GetMusicResponseSchema.parse(res);
      const list = data.musics.map((d) => {
        return { ...d, isPlaying: false };
      });
      return { message: data.message, isSuccess: data.isSuccess, musics: list };
    } catch (e: any) {
      return {
        message: e.issues[0].message,
        isSuccess: false,
      };
    }
  }
  static async deleteSelected(ids: string[]) {
    try {
      const res = await delay();
      const data = DeleteMusicResponseSchema.parse(res);
      const list = data.musics.map((d) => {
        return { ...d, isPlaying: false };
      });

      return { message: data.message, isSuccess: data.isSuccess, musics: list };
    } catch (e: any) {
      return {
        message: e.issues[0].message,
        isSuccess: false,
      };
    }
  }
}
