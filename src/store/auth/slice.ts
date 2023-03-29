import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postType";

export type ProductStateType = {
	data: any;
	isLoadingData: boolean;
	hasErrorData: boolean;
	errorMessage: string;
	userRequestData: { email: string; password: string };
	isAuthUser: boolean;
	registersData: any;
	isLoadingRegisterData: boolean;
	hasErrorRegisterData: boolean;
	registerUserRequestData: {
		fullName: string;
		email: string;
		password: string;
		avatarUrl: string;
	};
	isOpenLogoutModal: boolean;
};

const initialState: ProductStateType = {
	data: null,
	isLoadingData: true,
	hasErrorData: false,
	errorMessage: "",
	userRequestData: { email: "test", password: "test" },
	isAuthUser: false,
	registersData: null,
	isLoadingRegisterData: true,
	hasErrorRegisterData: false,
	registerUserRequestData: {
		fullName: "",
		email: "test",
		password: "test",
		avatarUrl: "",
	},
	isOpenLogoutModal: false,
};
const NAME = "Auth";

const requestAuth: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingData = true;
	state.hasErrorData = false;
};

const requestAuthMe: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingData = true;
	state.hasErrorData = false;
};

const successAuth: CaseReducer<ProductStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.isLoadingData = false;
	state.hasErrorData = false;
	state.data = payload;
	state.errorMessage = "";

	console.log("payload", payload);

	if ("_id" in payload) {
		state.isAuthUser = true;
	}
	if ("token" in payload) {
		window.localStorage.setItem("token", payload.token);
	}
	if (Boolean(payload.response) && !state.isAuthUser) {
		state.errorMessage = payload.response.data.message;
	}
};

const failureAuth: CaseReducer<ProductStateType, PayloadAction<string>> = (
	state,
	payload
) => {
	state.isLoadingData = false;
	state.hasErrorData = true;
	state.errorMessage = payload.payload;
};

const changeUserRequestData: CaseReducer<
	ProductStateType,
	PayloadAction<{ email: string; password: string }>
> = (state, payload) => {
	state.userRequestData = payload.payload;
};

const logout: CaseReducer<ProductStateType> = (state) => {
	state.data = null;
	state.isAuthUser = false;

	window.localStorage.removeItem("token");
};

const requestRegister: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingRegisterData = true;
	state.hasErrorRegisterData = false;
};

const successRegister: CaseReducer<ProductStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.isLoadingRegisterData = false;
	state.hasErrorRegisterData = false;
	state.registersData = payload;

	console.log("payload register user", payload);
};

const failureRegister: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingRegisterData = false;
	state.hasErrorRegisterData = true;
};

const changeRegisterUserRequestData: CaseReducer<
	ProductStateType,
	PayloadAction<{
		fullName: string;
		email: string;
		password: string;
		avatarUrl: string;
	}>
> = (state, payload) => {
	state.registerUserRequestData = payload.payload;
};

const changeIsOpenLogoutModal: CaseReducer<ProductStateType> = (state) => {
	state.isOpenLogoutModal = !state.isOpenLogoutModal;
};

export const { actions: AuthActions, reducer: AuthReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		requestAuthMe,
		requestAuth,
		successAuth,
		failureAuth,
		changeUserRequestData,
		logout,
		requestRegister,
		successRegister,
		failureRegister,
		changeRegisterUserRequestData,
		changeIsOpenLogoutModal,
	},
});
