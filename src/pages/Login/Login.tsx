import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { postAuth } from "../../api/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	DataSelector,
	errorMessageSelector,
	hasErrorDataSelector,
	isAuthUserSelector,
	UserRequestDataSelector,
} from "../../store/auth";

import "./Login.css";

export function Login() {
	const dispatch = useAppDispatch();
	const requestData = useAppSelector(UserRequestDataSelector);
	const data = useAppSelector(DataSelector);
	const isAuth = useAppSelector(isAuthUserSelector);
	const hasError = useAppSelector(hasErrorDataSelector);
	const errorMessage = useAppSelector(errorMessageSelector);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = (value: { email: string; password: string }) => {
		console.log(value);
		dispatch(AuthActions.changeUserRequestData(value));
		dispatch(AuthActions.requestAuth());
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}
	return (
		<div >
			<Paper className="login_root">
				<Typography className="login_title" variant="h5">
					Вход в аккаунт
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						className="login_field"
						label="E-Mail"
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						{...register("email", { required: "Укажите почту" })}
						fullWidth
					/>
					<TextField
						className="login_field"
						label="Пароль"
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						{...register("password", {
							required: "Укажите пароль",
						})}
						fullWidth
					/>
					<Button
						type="submit"
						size="large"
						variant="contained"
						fullWidth
					>
						Войти
					</Button>
                    {errorMessage && <p>{errorMessage}</p>}
				</form>
                
			</Paper>
			
		</div>
	);
}
