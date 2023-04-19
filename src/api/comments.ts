import axios from "axios";

type commentType = {
	user: { fullName: string; avatarUrl: string };
	comment: string;
};

export const getOnePostComments = (
	id: string | number
): Promise<commentType[]> => {
	return axios
		.get<commentType[]>(`http://localhost:4444/posts/${id}/comments`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data);
};
