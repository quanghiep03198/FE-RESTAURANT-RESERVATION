import { axiosInstance } from "@/configs/axios.config";
import type { IUser } from "./auth.interface";

export class AuthService {
	public static getCredentials(): IUser {
		return {
			username: "",
			displayname: "",
		};
	}

	public static logout() {}

	public static async refreshToken(signal: AbortSignal) {
		return await axiosInstance.get<void, ResponseBody<{ accessToken: string }>>(
			"/refresh-token",
			{ signal },
		);
	}
}
