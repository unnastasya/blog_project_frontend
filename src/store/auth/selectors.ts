import { ApplicationState } from "..";

export const AuthSelector = (state: ApplicationState) => state.auth;

export const DataSelector = (state: ApplicationState) => AuthSelector(state).data;
export const isLoadingDataSelector = (state: ApplicationState) => AuthSelector(state).isLoadingData;
export const hasErrorDataSelector = (state: ApplicationState) => AuthSelector(state).hasErrorData;
export const UserRequestDataSelector = (state: ApplicationState) => AuthSelector(state).userRequestData;
export const isAuthUserSelector = (state: ApplicationState) => AuthSelector(state).isAuthUser;

export const registerDataSelector = (state: ApplicationState) => AuthSelector(state).registersData;
export const isLoadingRegisterDataSelector = (state: ApplicationState) => AuthSelector(state).isLoadingRegisterData;
export const hasErrorRegisterDataSelector = (state: ApplicationState) => AuthSelector(state).hasErrorRegisterData;
export const reqisterUserRequestDataSelector = (state: ApplicationState) => AuthSelector(state).registerUserRequestData;

export const isOpenLogoutModalSelector = (state: ApplicationState) => AuthSelector(state).isOpenLogoutModal
export const errorMessageSelector = (state: ApplicationState) => AuthSelector(state).errorMessage



