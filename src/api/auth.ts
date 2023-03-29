import axios from "axios";
import qs from "qs";

export const postAuth = (params: any): Promise<any> => {
	return axios
		.post(`http://localhost:4444/auth/login`, qs.stringify(params), {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};

export const postAuthMe = (): Promise<any> => {
	console.log("saga");
	return axios
		.get(`http://localhost:4444/auth/me`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data)
		.catch((error) => error);
};
