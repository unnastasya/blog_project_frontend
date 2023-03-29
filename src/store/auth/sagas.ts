import { takeLatest, call, put, select } from "redux-saga/effects";
import { AuthActions } from "./slice";
import { reqisterUserRequestDataSelector, UserRequestDataSelector } from "./selectors";
import { postAuth, postAuthMe } from "../../api/auth";
import { postRegister } from "../../api/register";

function* getAuthSaga() {
	try {
		const requestData: { email: string; password: string } = yield select(
			UserRequestDataSelector
		);
        console.log("request", requestData)
		const data: {} =  yield call(postAuth, requestData);
        console.log("dataAuth", data)
		yield put(AuthActions.successAuth(data));
	} catch (e: any) {
        console.log("e", e)
		yield put(AuthActions.failureAuth(e));
	}
}

function* getAuthMeSaga() {
	try {
		const data: {} =  yield call(postAuthMe);
        console.log("dataPostAuth", data)
		yield put(AuthActions.successAuth(data));
	} catch (e: any) {
		yield put(AuthActions.failureAuth(e));
	}
}

function* getRegisterSaga() {
	try {
		const requestData: {fullName: string, email: string; password: string; avatarUrl: string } = yield select(
			reqisterUserRequestDataSelector
		);
        console.log("request", requestData)
		const data: {} =  yield call(postRegister, requestData);
        console.log("data", data)
		yield put(AuthActions.successRegister(data));
        if ("token" in data) {
            yield put(AuthActions.successAuth(data));
        }
	} catch (e: any) {
		yield put(AuthActions.failureRegister());
	}
}

export function* watchGetRegisterSaga() {
	yield takeLatest(AuthActions.requestRegister.type, getRegisterSaga);
}

export function* watchGetAuthMeSaga() {
	yield takeLatest(AuthActions.requestAuthMe.type, getAuthMeSaga);
}


export function* watchGetAuthSaga() {
	yield takeLatest(AuthActions.requestAuth.type, getAuthSaga);
}