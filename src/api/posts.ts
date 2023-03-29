import axios from "axios";
import { PostType } from "../types/postType";
import qs from "qs";

export const getPosts = (): Promise<PostType[]> => {
	return axios
		.get<PostType[]>(`http://localhost:4444/posts`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data);
};

export const getTags = (): Promise<string[]> => {
	return axios
		.get<string[]>(`http://localhost:4444/posts/lastTags`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data);
};

export const getAllTags = (): Promise<string[]> => {
	return axios
		.get<string[]>(`http://localhost:4444/posts/tags`)
		.then((response) => response.data);
};

export const getOnePost = (id: string): Promise<PostType> => {
	return axios
		.get<PostType>(`http://localhost:4444/posts/${id}`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) => response.data);
};

export const deletePost = (data: {
	id: string;
	token: string;
}): Promise<any> => {
	return axios.delete(`http://localhost:4444/posts/${data.id}`, {
		headers: {
			authorization: window.localStorage.getItem("token"),
		},
	});
};

export const editPost = (data: {
	id: string;
	token: string;
	fields: {
		title: string;
		text: string;
		imageUrl: string;
		userId: string;
		tags: string;
	};
}): Promise<any> => {
	return axios.patch(
		`http://localhost:4444/posts/${data.id}`,
		qs.stringify(data.fields),
		{
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		}
	);
};

export const getLastComments = () => {
    axios.get(`http://localhost:4444/posts/comments` ,{
        headers: {
            authorization: window.localStorage.getItem("token"),
        },
    })
}