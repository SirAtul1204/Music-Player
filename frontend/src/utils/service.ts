import { IAddMusic, IEditMusic, ILogin, IRegister } from "./interfaces";
import {
  DeleteMusicResponseSchema,
  GeneralResponseSchema,
  GetMusicResponseSchema,
  PlayMusicResponseSchema,
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
      return {
        isSuccess: false,
        message: e.issues[0].message,
      };
    }
  }

  static async getAllMusic() {
    try {
      const response = await fetch(backendUrl + "music/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

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
      return data;
    } catch (e) {
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

  static async addMusic({
    title,
    description,
    coverAlbum,
    artist,
    file,
  }: IAddMusic) {
    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("coverAlbum", coverAlbum);
      formData.append("artistName", artist);
      formData.append("file", file);

      const response = await fetch(backendUrl + "music/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      const res = GeneralResponseSchema.parse(data);
      return res;
    } catch (e) {
      return {
        message: "Couldn't save your file, please try again",
        isSuccess: false,
      };
    }
  }

  static async play(id: string) {
    try {
      const response = await fetch(backendUrl + "music/play/" + id, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      const data = PlayMusicResponseSchema.parse(res);
      return data;
    } catch (e) {
      console.error(e);
      return {
        message: "Can't play that song. Please try again!",
        isSuccess: false,
        url: "",
      };
    }
  }

  static async editMusic(editMusicInformation: IEditMusic) {
    try {
      const response = await fetch(backendUrl + "music/", {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editMusicInformation.id,
          name: editMusicInformation.name,
          artistName: editMusicInformation.artist,
          description: editMusicInformation.description,
          coverAlbum: editMusicInformation.coverAlbum,
        }),
      });

      const res = await response.json();
      const data = GeneralResponseSchema.parse(res);
      return data;
    } catch (e) {
      return {
        message: "Can't edit selected songs. Please try again!",
        isSuccess: false,
      };
    }
  }

  static async deleteMusics(ids: string[]) {
    try {
      const response = await fetch(backendUrl + "music/", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      const res = await response.json();
      const data = DeleteMusicResponseSchema.parse(res);
      const list = data.musics.map((d) => {
        return { ...d, isPlaying: false };
      });
      return {
        message: data.message,
        isSuccess: data.isSuccess,
        count: data.count,
        musics: list,
      };
    } catch (e) {
      return {
        message: "Can't delete selected songs. Please try again!",
        isSuccess: false,
        count: 0,
        musics: [],
      };
    }
  }
}
