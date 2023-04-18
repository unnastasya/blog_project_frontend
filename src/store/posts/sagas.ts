import { takeLatest, call, put, select } from "redux-saga/effects";
import { PostType } from "../../types/postType";
import { deletePost, getAllTags, getLastComments, getOnePost, getPosts, getPostsWithOneTag, getTags } from "../../api/posts"
import { PostsActions } from "./slice";
import { deleteRequestDataSelector, requestDataSelector, tagsRequestSelector } from "./selectors";

function* getPostsSaga() {
	try {
		const posts: PostType[] = yield call(
			getPosts
		);
		yield put(PostsActions.successPosts(posts));
	} catch (e: any) {
		yield put(PostsActions.failurePosts(e));
	}
}


function* getPostsWithTagsSaga() {
	try {
        const requestData: string = yield select(
			tagsRequestSelector
		);
		const posts: PostType[] = yield call(
			getPostsWithOneTag, requestData
		);
		yield put(PostsActions.successPosts(posts));
	} catch (e: any) {
		yield put(PostsActions.failurePosts(e));
	}
}

function* getTagsSaga() {
	try {
		const tags: string[] = yield call(
			getTags
		);
		yield put(PostsActions.successTags(tags));
	} catch (e: any) {
		yield put(PostsActions.failureTags());
	}
}

function* getAllTagsSaga() {
	try {
		const tags: string[] = yield call(
			getAllTags
		);
        console.log("TAGS", tags)
		yield put(PostsActions.successAllTags(tags));
	} catch (e: any) {
		yield put(PostsActions.failureAllTags());
	}
}

function* getLastCommentsSaga() {
    console.log("comments")
    try {
        const comments: any[] = yield call(getLastComments);
        console.log("getCOMMENTS", comments)
        yield put(PostsActions.successAllComments(comments));
    } catch (error) {
        yield put(PostsActions.failureAllComments())
    }
}

function* deletePostSaga() {
    try {
        const requestData: { id: string; token: string } = yield select(
			deleteRequestDataSelector
		);
        const dataDelete: {} =  yield call(deletePost, requestData);
        console.log(dataDelete)
        const posts: PostType[] = yield call(
			getPosts
		);
        yield put(PostsActions.successPosts(posts));
    } catch (error) {
        yield put(PostsActions.failurePosts(error));
    }
}

function* getOnePostSaga() {
	try {
		const requestsData: string = yield select(requestDataSelector);

		const post: PostType = yield call(
			getOnePost,
			requestsData
		);
		yield put(PostsActions.successOnePost(post));
	} catch (e: any) {
		yield put(PostsActions.failureOnePost());
	}
}


export function* watchGetPostsSaga() {
	yield takeLatest(
		PostsActions.requestPosts.type,
		getPostsSaga
	);
}

export function* watchGetTagsSaga() {
	yield takeLatest(
		PostsActions.requestTags.type,
		getTagsSaga
	);
}

export function* watchGetAllTagsSaga() {
	yield takeLatest(
		PostsActions.requestAllTags.type,
		getAllTagsSaga
	);
}

export function* watchgetOnePostsSaga() {
	yield takeLatest(
		PostsActions.requestOnePost.type,
		getOnePostSaga
	);
}

export function* watchgetDeletePostSaga() {
	yield takeLatest(
		PostsActions.deletePost.type,
		deletePostSaga
	);
}

export function* watchgetGetLastCommentsSaga() {
	yield takeLatest(
		PostsActions.requestAllComments.type,
		getLastCommentsSaga
	);
}

export function* watchGetPostsWithTagsSaga() {
	yield takeLatest(
		PostsActions.requestPostsWithTags.type,
		getPostsWithTagsSaga
	);
}