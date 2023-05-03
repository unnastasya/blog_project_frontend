import { takeLatest, call, put, select } from "redux-saga/effects";
import { AuthActions } from "./slice";
import {
	reqisterUserRequestDataSelector,
	loginUserRequestDataSelector,
} from "./selectors";
import { postAuth, postAuthMe } from "../../api/auth";
import { postRegister } from "../../api/register";
import { LoginUserType, RegisterUserType } from "../../types/UserType";

function* getAuthSaga() {
	try {
		const requestData: LoginUserType = yield select(
			loginUserRequestDataSelector
		);
		const data: {} = yield call(postAuth, requestData);
		if (!("token" in data)) {
			throw new Error("Неверный логин или пароль");
		}
		yield put(AuthActions.successAuth(data));
	} catch (e: any) {
		yield put(AuthActions.failureAuth(e.message));
	}
}

function* getAuthMeSaga() {
	try {
		const data:
			| {}
			| { message: string; response: { data: { message: string } } } =
			yield call(postAuthMe);
		if (!("message" in data)) {
			yield put(AuthActions.successAuth(data));
		} else {
			throw new Error();
		}
	} catch (e: any) {
		yield put(AuthActions.failureAuth(e.message));
	}
}

function* getRegisterSaga() {
	try {
		const requestData: RegisterUserType = yield select(
			reqisterUserRequestDataSelector
		);
		const data: {} = yield call(postRegister, requestData);
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
