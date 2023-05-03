import axios from "axios";
import qs from "qs";
import { CommentType } from "../types/CommentType";

export const getOnePostComments = (
	id: string | number
): Promise<CommentType[]> => {
	return axios
		.get<CommentType[]>(`http://localhost:4444/comments/${id}`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data);
};

export const getLastComments = (): Promise<CommentType[]> => {
	return axios
		.get<CommentType[]>(`http://localhost:4444/comments`)
		.then((response) => response.data);
};

export const postComment = (field: CommentType) => {
	axios.post(
		`http://localhost:4444/comments/${field.postId}`,
		qs.stringify(field),
		{
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		}
	);
};

export const deleteComment = (data: { id: string; commentId: string }) => {
	console.log("DELETE AXIOS");
	axios.delete(
		`http://localhost:4444/post/${data.id}/comments/${data.commentId}`,
		{
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		}
	);
};
