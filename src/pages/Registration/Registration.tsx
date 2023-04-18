import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	AuthActions,
	isAuthUserSelector,
} from "../../store/auth";

import "./Registration.css";

export function Registration() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>("");

	const {
		register,
		handleSubmit,
		
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			avatarUrl: "",
		},
		mode: "onChange",
	});

	const onSubmit = (value: {
		fullName: string;
		email: string;
		password: string;
		avatarUrl: string;
	}) => {
		value.avatarUrl= `http://localhost:4444${imageURL}` ;
		dispatch(AuthActions.changeRegisterUserRequestData(value));
		dispatch(AuthActions.requestRegister());
	};

	const handleChangeFile = async (event: any) => {
		try {
			const dataImage = new FormData();
			const file = event.target.files[0];
			dataImage.append("image", file);

			console.log(dataImage);
			const { data } = await axios.post(
				"http://localhost:4444/uploadAvatar",
				dataImage,
				{
					headers: {
						authorization: window.localStorage.getItem("token"),
					},
				}
			);
			setImageURL(data.url);
		} catch (error) {
			console.warn(error);
			alert("Ошибка при загрузке файла");
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className="registrationPage">
			<Paper className="registration_root">
				<Typography className="registration_title" variant="h5">
					Создание аккаунта
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="registration_avatar">
						<Avatar
							onClick={() => inputFileRef.current?.click()}
							sx={{ width: 100, height: 100 }}
							src={`http://localhost:4444${imageURL}`}
						/>
					</div>
					<input
						ref={inputFileRef}
						type="file"
						onChange={(e) => handleChangeFile(e)}
						hidden
					/>
					<TextField
						className="registration_field"
						label="Полное имя"
						error={Boolean(errors.fullName?.message)}
						helperText={errors.fullName?.message}
						{...register("fullName", {
							required: "Укажите полное имя",
						})}
						fullWidth
					/>
					<TextField
						className="registration_field"
						label="E-mail"
						error={Boolean(errors.email?.message)}
						helperText={errors.email?.message}
						{...register("email", { required: "Укажите почту" })}
						fullWidth
					/>
					<TextField
						className="registration_field"
						label="Пароль"
						error={Boolean(errors.password?.message)}
						helperText={errors.password?.message}
						{...register("password", {
							required: "Укажите пароль",
						})}
						fullWidth
					/>
					<Button
						disabled={!isValid}
						type="submit"
						size="large"
						variant="contained"
						fullWidth
					>
						Зарегистироваться
					</Button>
				</form>
			</Paper>
		</div>
	);
}
