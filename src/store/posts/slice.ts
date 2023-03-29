import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postType";

export type ProductStateType = {
	posts: PostType[];
	isLoadingPosts: boolean;
	hasErrorPosts: boolean;
	tags: string[];
    comments: any[];
	isLoadingTags: boolean;
	hasErrorTags: boolean;
	onePost?: PostType;
	isLoadingOnePost: boolean;
	hasErrorOnePost: boolean;
	requestData: string;
	deletePostData?: {
		id: string;
		token: string;
	};
    allTags?: string[]
};

const initialState: ProductStateType = {
	posts: [],
	isLoadingPosts: true,
	hasErrorPosts: false,
	tags: [],
    comments: [],
	isLoadingTags: false,
	hasErrorTags: false,
	isLoadingOnePost: false,
	hasErrorOnePost: false,
	requestData: "",
    allTags: []
};
const NAME = "Posts";

const requestPosts: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = true;
	state.hasErrorPosts = false;
};

const successPosts: CaseReducer<ProductStateType, PayloadAction<PostType[]>> = (
	state,
	{ payload }
): any => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = false;
	state.posts = payload;

};

const failurePosts: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = true;
};

const requestTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = true;
	state.hasErrorTags = false;
};

const successTags: CaseReducer<ProductStateType, PayloadAction<string[]>> = (
	state,
	{ payload }
) => {
	state.isLoadingTags = false;
	state.hasErrorTags = false;
	state.tags = payload;
};

const failureAllComments: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = false;
	state.hasErrorTags = true;
};

const requestAllComments: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = true;
	state.hasErrorTags = false;
};

const successAllComments: CaseReducer<ProductStateType, PayloadAction<any[]>> = (
	state,
	{ payload }
) => {
	state.isLoadingTags = false;
	state.hasErrorTags = false;
	state.comments = payload;
};

const failureTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingTags = false;
	state.hasErrorTags = true;
};


const requestAllTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = true;
	state.hasErrorPosts = false;
};

const successAllTags: CaseReducer<ProductStateType, PayloadAction<string[]>> = (
	state,
	{ payload }
): any => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = false;
	state.allTags = payload;

};

const failureAllTags: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = false;
	state.hasErrorPosts = true;
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
};

const failureOnePost: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingOnePost = false;
	state.hasErrorOnePost = true;
};

const changeRequestsData: CaseReducer<
	ProductStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestData = payload;
};

const deletePost: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingPosts = true;
	state.hasErrorPosts = false;
};

const changeDeleteData: CaseReducer<
	ProductStateType,
	PayloadAction<{ id: string; token: string }>
> = (state, payload) => {
	console.log(payload);
	state.deletePostData = payload.payload;
};
export const { actions: PostsActions, reducer: PostsReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestPosts,
		successPosts,
		failurePosts,
		requestTags,
		successTags,
		failureTags,
		requestOnePost,
		successOnePost,
		failureOnePost,
		changeRequestsData,
		deletePost,
		changeDeleteData,
        requestAllTags,
        successAllTags,
        failureAllTags,
        requestAllComments,
        successAllComments,
        failureAllComments,
	},
});
