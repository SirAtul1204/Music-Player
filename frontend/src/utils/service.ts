import { ILogin, IRegister } from "./interfaces";
import {
  DeleteMusicResponseSchema,
  GeneralResponseSchema,
  GetMusicResponseSchema,
} from "./zodSchemas";

function delay(time = 100) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:5000/";

export default class Service {
  static async login(loginInformation: ILogin) {
    try {
      const response = await fetch(backendUrl + "user/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInformation),
      });

      const res = await response.json();
      const data = GeneralResponseSchema.parse(res);
      return data;
    } catch (e: any) {
      console.log(e);
      return {
        isSuccess: false,
        message: e.issues[0].message,
      };
    }
  }

  static async register(registerInformation: IRegister) {
    try {
      const response = await fetch(backendUrl + "user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInformation),
      });

      const res = await response.json();
      const data = GeneralResponseSchema.parse(res);
      return data;
    } catch (e: any) {
      console.log(e);
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

  static async verifyToken() {
    try {
      const response = await fetch(backendUrl + "user/verify", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      const data = GeneralResponseSchema.parse(res);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return { message: "Wrong Token", isSuccess: false };
    }
  }

  static async logout() {
    try {
      const response = await fetch(backendUrl + "user/logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      const data = GeneralResponseSchema.parse(res);
      return data;
    } catch (e) {
      return {
        message: "Error",
        isSuccess: false,
      };
    }
  }
}
