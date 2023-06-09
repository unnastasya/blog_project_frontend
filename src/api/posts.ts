import axios from "axios";
import { PostType } from "../types/PostType";
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

export const getPostsWithOneTag = (tag: string): Promise<PostType[]> => {
	return axios
		.get<PostType[]>(`http://localhost:4444/posts`, {
			headers: {
				authorization: window.localStorage.getItem("token"),
			},
		})
		.then((response) =>
			response.data.filter((post) => post.tags.includes(tag))
		);
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

export const deletePost = (data: { id: string; token: string }) => {
	axios.delete(`http://localhost:4444/posts/${data.id}`, {
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
}) => {
	axios.patch(
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
	axios
		.get(`http://localhost:4444/posts/comments`)
		.then((response) => response.data);
};
