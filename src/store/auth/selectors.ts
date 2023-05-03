import { ApplicationState } from "..";

export const AuthSelector = (state: ApplicationState) => state.auth;

export const userDataSelector = (state: ApplicationState) => AuthSelector(state).userData;
export const isLoadingDataSelector = (state: ApplicationState) => AuthSelector(state).isLoadingData;
export const hasErrorDataSelector = (state: ApplicationState) => AuthSelector(state).hasErrorData;
export const isAuthUserSelector = (state: ApplicationState) => AuthSelector(state).isAuthUser;

export const loginUserRequestDataSelector = (state: ApplicationState) => AuthSelector(state).loginUserRequestData;

export const reqisterUserRequestDataSelector = (state: ApplicationState) => AuthSelector(state).registerUserRequestData;

export const isLoadingRegisterDataSelector = (state: ApplicationState) => AuthSelector(state).isLoadingRegisterData;
export const hasErrorRegisterDataSelector = (state: ApplicationState) => AuthSelector(state).hasErrorRegisterData;

export const isOpenLogoutModalSelector = (state: ApplicationState) => AuthSelector(state).isOpenLogoutModal
export const errorMessageSelector = (state: ApplicationState) => AuthSelector(state).errorMessage



