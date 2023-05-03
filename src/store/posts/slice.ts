import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/PostType";
import { CommentType } from "../../types/CommentType";

export type ProductStateType = {
	posts: PostType[];
	isLoadingPosts: boolean;
	hasErrorPosts: boolean;
	errorMessage?: string;
	allTags?: string[];
	isLoadingTags: boolean;
	hasErrorTags: boolean;
	comments: CommentType[];
	isLoadingComments: boolean;
	hasErrorComments: boolean;
	onePost?: PostType;
	isLoadingOnePost: boolean;
	hasErrorOnePost: boolean;
	requestPostIdData: string;
	deletePostData?: {
		id: string;
		token: string;
	};
	tagRequestData: string;
	onePostComments: CommentType[];
};

const initialState: ProductStateType = {
	posts: [],
	isLoadingPosts: true,
	hasErrorPosts: false,
	isLoadingTags: false,
	hasErrorTags: false,
	comments: [],
	isLoadingComments: false,
	hasErrorComments: false,
	isLoadingOnePost: false,
	hasErrorOnePost: false,
	requestPostIdData: "",
	allTags: [],
	tagRequestData: "",
	onePostComments: [],
};
const NAME = "Posts";

const requestPosts: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = true;
	state.hasErrorPosts = false;
	state.posts = [];
};

const successPosts: CaseReducer<ProductStateType, PayloadAction<PostType[]>> = (
	state,
	{ payload }
) => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = false;
	state.posts = payload;
};

const failurePosts: CaseReducer<ProductStateType, PayloadAction<any>> = (
	state,
	action
) => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = true;
	state.errorMessage = action.payload;
};

const requestAllComments: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingComments = true;
	state.hasErrorComments = false;
};

const successAllComments: CaseReducer<
	ProductStateType,
	PayloadAction<CommentType[]>
> = (state, { payload }) => {
	state.isLoadingComments = false;
	state.hasErrorComments = false;
	state.comments = payload;
};

const failureAllComments: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingComments = false;
	state.hasErrorComments = true;
};

const requestAllTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = true;
	state.hasErrorTags = false;
};

const successAllTags: CaseReducer<ProductStateType, PayloadAction<string[]>> = (
	state,
	{ payload }
) => {
	state.isLoadingTags = false;
	state.hasErrorTags = false;
	state.allTags = payload;
};

const failureAllTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = false;
	state.hasErrorTags = true;
};

const requestOnePost: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingOnePost = true;
	state.hasErrorOnePost = false;
};

const successOnePost: CaseReducer<ProductStateType, PayloadAction<PostType>> = (
	state,
	{ payload }
) => {
	state.isLoadingOnePost = false;
	state.hasErrorOnePost = false;
	state.onePost = payload;
	state.onePostComments = payload.comments;
};

const failureOnePost: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingOnePost = false;
	state.hasErrorOnePost = true;
};

const changeRequestsPostIdData: CaseReducer<
	ProductStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestPostIdData = payload;
};

const deletePost: CaseReducer<ProductStateType> = (state) => {};

const changeDeletePostData: CaseReducer<
	ProductStateType,
	PayloadAction<{ id: string; token: string }>
> = (state, payload) => {
	state.deletePostData = payload.payload;
};

const changeTagData: CaseReducer<ProductStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.tagRequestData = payload;
};

const requestPostsWithTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = true;
	state.hasErrorPosts = false;
	state.posts = [];
};

const getOnePostComments: CaseReducer<ProductStateType> = (state) => {};
const successOnePostComments: CaseReducer<
	ProductStateType,
	PayloadAction<CommentType[]>
> = (state, { payload }) => {
	state.onePostComments = payload;
};

const failureOnePostComments: CaseReducer<ProductStateType> = (state) => {
	state.onePostComments = [];
};

export const { actions: PostsActions, reducer: PostsReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestPosts,
		successPosts,
		failurePosts,
		requestOnePost,
		successOnePost,
		failureOnePost,
		changeRequestsPostIdData,
		deletePost,
		changeDeletePostData,
		requestAllTags,
		successAllTags,
		failureAllTags,
		requestAllComments,
		successAllComments,
		failureAllComments,
		changeTagData,
		requestPostsWithTags,
		successOnePostComments,
		failureOnePostComments,
		getOnePostComments,
	},
});
