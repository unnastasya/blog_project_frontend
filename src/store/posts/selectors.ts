import { ApplicationState } from "..";

export const PostsSelector = (state: ApplicationState) => state.posts;

export const PostsArraySelector = (state: ApplicationState) =>
	PostsSelector(state).posts;
export const isLoadingPostsSelector = (state: ApplicationState) =>
	PostsSelector(state).isLoadingPosts;

export const isLoadingTagsSelector = (state: ApplicationState) =>
	PostsSelector(state).isLoadingTags;

export const OnePostSelector = (state: ApplicationState) =>
	PostsSelector(state).onePost;
export const isLoadingOnePostsSelector = (state: ApplicationState) =>
	PostsSelector(state).isLoadingOnePost;

export const requestPostIdDataSelector = (state: ApplicationState) =>
	PostsSelector(state).requestPostIdData;
export const deleteRequestDataSelector = (state: ApplicationState) =>
	PostsSelector(state).deletePostData;

export const allTagsSelector = (state: ApplicationState) =>
	PostsSelector(state).allTags;

export const lastCommentsSelector = (state: ApplicationState) =>
	PostsSelector(state).comments;

export const tagsRequestSelector = (state: ApplicationState) =>
	PostsSelector(state).tagRequestData;

export const onePostCommentsSelector = (state: ApplicationState) =>
	PostsSelector(state).onePostComments;
