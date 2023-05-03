import React from "react";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	errorMessageSelector,
	isAuthUserSelector,
} from "../../store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "./LoginValidation";

import "./Login.css";

export function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector(isAuthUserSelector);
	const errorMessage = useAppSelector(errorMessageSelector);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
		resolver: yupResolver(loginValidationSchema),
	});

	const onSubmit = (data: { email: string; password: string }) => {
		const value = { ...data };
		console.log(value);
		dispatch(AuthActions.changeUserRequestData(value));
		dispatch(AuthActions.requestAuth());
	};

	if (isAuth) {
		navigate("/");
	}

	return (
		<div className="loginPage">
			<Paper className="login_root">
				<Typography className="login_title" variant="h5">
					Вход в аккаунт
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<>
								<TextField
									className="login_field"
									label="E-Mail"
									error={Boolean(errors.email?.message)}
									helperText={errors.email?.message}
									fullWidth
									{...field}
								/>
							</>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<>
								<TextField
									className="login_field"
									label="Пароль"
									error={Boolean(errors.password?.message)}
									helperText={errors.password?.message}
									fullWidth
									{...field}
								/>
							</>
						)}
					/>
					{errorMessage && (
						<Alert className="error_field" severity="error">
							{errorMessage}
						</Alert>
					)}
					<Button
						type="submit"
						size="large"
						variant="contained"
						fullWidth
					>
						Войти
					</Button>
				</form>
			</Paper>
		</div>
	);
}
