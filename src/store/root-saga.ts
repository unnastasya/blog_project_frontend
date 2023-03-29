import { fork } from "redux-saga/effects";
import {
	watchGetAuthMeSaga,
	watchGetAuthSaga,
	watchGetRegisterSaga,
} from "./auth";
import {
	watchGetAllTagsSaga,
	watchgetDeletePostSaga,
	watchgetGetLastCommentsSaga,
	watchgetOnePostsSaga,
	watchGetPostsSaga,
	watchGetTagsSaga,
} from "./posts";

export function* rootSaga() {
	yield fork(watchGetPostsSaga);
	yield fork(watchgetOnePostsSaga);
	yield fork(watchGetTagsSaga);
	yield fork(watchGetAuthSaga);
	yield fork(watchGetRegisterSaga);
	yield fork(watchgetDeletePostSaga);
	yield fork(watchGetAuthMeSaga);
	yield fork(watchGetAllTagsSaga);
	yield fork(watchgetGetLastCommentsSaga);
}
