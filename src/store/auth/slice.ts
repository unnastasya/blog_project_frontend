import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	LoginUserType,
	UserType,
	RegisterUserType,
} from "../../types/UserType";

export type ProductStateType = {
	userData: UserType;
	isLoadingData: boolean;
	hasErrorData: boolean;
	errorMessage: string;
	loginUserRequestData: LoginUserType;
	isAuthUser: boolean;
	isLoadingRegisterData: boolean;
	hasErrorRegisterData: boolean;
	registerUserRequestData: RegisterUserType;
	isOpenLogoutModal: boolean;
};

const initialState: ProductStateType = {
	userData: {},
	isLoadingData: true,
	hasErrorData: false,
	errorMessage: "",
	loginUserRequestData: { email: "", password: "" },
	isAuthUser: false,
	isLoadingRegisterData: true,
	hasErrorRegisterData: false,
	registerUserRequestData: {
		fullName: "",
		email: "",
		password: "",
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

const successAuth: CaseReducer<ProductStateType, PayloadAction<UserType>> = (
	state,
	{ payload }
) => {
	state.isLoadingData = false;
	state.hasErrorData = false;
	state.userData = payload;
	state.errorMessage = "";

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
	payload?
) => {
	state.isLoadingData = false;
	state.hasErrorData = true;
	state.errorMessage = payload?.payload;
};

const changeUserRequestData: CaseReducer<
	ProductStateType,
	PayloadAction<LoginUserType>
> = (state, payload) => {
	state.loginUserRequestData = payload.payload;
};

const logout: CaseReducer<ProductStateType> = (state) => {
	state.userData = {};
	state.isAuthUser = false;

	window.localStorage.removeItem("token");
};

const requestRegister: CaseReducer<ProductStateType> = (state) => {
	state.isLoadingRegisterData = true;
	state.hasErrorRegisterData = false;
};

const successRegister: CaseReducer<
	ProductStateType,
	PayloadAction<UserType>
> = (state, { payload }) => {
	state.isLoadingRegisterData = false;
	state.hasErrorRegisterData = false;
	state.userData = payload;
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
		requestRegister,
		successRegister,
		failureRegister,
		changeRegisterUserRequestData,
		changeIsOpenLogoutModal,
		logout,
	},
});
