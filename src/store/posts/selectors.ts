import { ApplicationState } from "..";

export const PostsSelector = (state: ApplicationState) => state.posts;

export const PostsArraySelector = (state: ApplicationState) => PostsSelector(state).posts;
export const isLoadingPostsSelector = (state: ApplicationState) => PostsSelector(state).isLoadingPosts;

export const TagsSelector = (state: ApplicationState) => PostsSelector(state).tags;
export const isLoadingTagsSelector = (state: ApplicationState) => PostsSelector(state).isLoadingTags;

export const OnePostSelector = (state: ApplicationState) => PostsSelector(state).onePost;
export const isLoadingOnePostsSelector = (state: ApplicationState) => PostsSelector(state).isLoadingOnePost;

export const requestDataSelector = (state: ApplicationState) => PostsSelector(state).requestData;
export const deleteRequestDataSelector = (state: ApplicationState) => PostsSelector(state).deletePostData;

export const allTagsSelector = (state: ApplicationState) => PostsSelector(state).allTags

export const lastCommentsSelector = (state: ApplicationState) => PostsSelector(state).comments
