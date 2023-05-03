import axios from "axios";
import qs from "qs";
import { LoginUserType, UserType } from "../types/UserType";

export const postAuth = (params: LoginUserType): Promise<UserType> => {
	return axios
		.post(`http://localhost:4444/auth/login`, qs.stringify(params), {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const postAuthMe = (): Promise<UserType> => {
	return axios
		.get(`http://localhost:4444/auth/me`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};
