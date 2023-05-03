import { takeLatest, call, put, select } from "redux-saga/effects";
import { PostType } from "../../types/PostType";
import {
	deletePost,
	getAllTags,
	getOnePost,
	getPosts,
	getPostsWithOneTag,
} from "../../api/posts";
import { PostsActions } from "./slice";
import {
	deleteRequestDataSelector,
	requestPostIdDataSelector,
	tagsRequestSelector,
} from "./selectors";
import { getOnePostComments } from "../../api/comments";
import { CommentType } from "../../types/CommentType";
import { getLastComments } from "../../api/comments";

function* getPostsSaga() {
	try {
		const posts: PostType[] = yield call(getPosts);
		yield put(PostsActions.successPosts(posts));
	} catch (e: any) {
		yield put(PostsActions.failurePosts(e));
	}
}

function* getPostsWithTagsSaga() {
	try {
		const requestData: string = yield select(tagsRequestSelector);
		const posts: PostType[] = yield call(getPostsWithOneTag, requestData);
		yield put(PostsActions.successPosts(posts));
	} catch (e: any) {
		yield put(PostsActions.failurePosts(e));
	}
}

function* getAllTagsSaga() {
	try {
		const tags: string[] = yield call(getAllTags);
		console.log("TAGS", tags);
		yield put(PostsActions.successAllTags(tags));
	} catch (e: any) {
		yield put(PostsActions.failureAllTags());
	}
}

function* getLastCommentsSaga() {
	console.log("comments");
	try {
		const comments: CommentType[] = yield call(getLastComments);
		console.log("getCOMMENTS", comments);
		yield put(PostsActions.successAllComments(comments));
	} catch (error) {
		yield put(PostsActions.failureAllComments());
	}
}

function* deletePostSaga() {
	try {
		const requestData: { id: string; token: string } = yield select(
			deleteRequestDataSelector
		);
		const dataDelete: {} = yield call(deletePost, requestData);
		console.log(dataDelete);
		const posts: PostType[] = yield call(getPosts);
		yield put(PostsActions.successPosts(posts));
	} catch (error: any) {
		yield put(PostsActions.failurePosts(error));
	}
}

function* getOnePostSaga() {
	try {
		const requestsData: string = yield select(requestPostIdDataSelector);

		const post: PostType = yield call(getOnePost, requestsData);
		yield put(PostsActions.successOnePost(post));
	} catch (e: any) {
		yield put(PostsActions.failureOnePost());
	}
}

function* getOnePostsCommentsSaga() {
	try {
		const requestsData: string = yield select(requestPostIdDataSelector);
		const comments: CommentType[] = yield call(
			getOnePostComments,
			requestsData
		);
		yield put(PostsActions.successOnePostComments(comments));
	} catch (e: any) {
		yield put(PostsActions.failureOnePostComments());
	}
}

export function* watchGetPostsSaga() {
	yield takeLatest(PostsActions.requestPosts.type, getPostsSaga);
}

export function* watchGetAllTagsSaga() {
	yield takeLatest(PostsActions.requestAllTags.type, getAllTagsSaga);
}

export function* watchgetOnePostsSaga() {
	yield takeLatest(PostsActions.requestOnePost.type, getOnePostSaga);
}

export function* watchgetDeletePostSaga() {
	yield takeLatest(PostsActions.deletePost.type, deletePostSaga);
}

export function* watchgetGetLastCommentsSaga() {
	yield takeLatest(PostsActions.requestAllComments.type, getLastCommentsSaga);
}

export function* watchGetPostsWithTagsSaga() {
	yield takeLatest(
		PostsActions.requestPostsWithTags.type,
		getPostsWithTagsSaga
	);
}
export function* watchGetPostsCommentsSaga() {
	yield takeLatest(
		PostsActions.getOnePostComments.type,
		getOnePostsCommentsSaga
	);
}
