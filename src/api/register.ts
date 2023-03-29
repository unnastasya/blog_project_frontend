import axios from "axios";
import qs from 'qs';

export const postRegister = ( params: {fullName: string, email: string; password: string; avatarUrl: string }): Promise<any> => {
	return axios
		.post(`http://localhost:4444/auth/register`, qs.stringify(params))
		.then((response) => response.data).catch((error) => error)
};