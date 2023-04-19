import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	errorMessageSelector,
	isAuthUserSelector,
} from "../../store/auth";

import "./Login.css";

export function Login() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const errorMessage = useAppSelector(errorMessageSelector);
    const navigate = useNavigate();
    
	const {
		register,
		handleSubmit,
		formState: { errors },
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
		navigate("/")
	}

	return (
		<div className="loginPage">
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
					{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
				</form>
			</Paper>
		</div>
	);
}
