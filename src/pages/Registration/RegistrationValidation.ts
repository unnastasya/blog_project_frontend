import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
	fullName: Yup.string().required("Укажите полное имя"),
	email: Yup.string()
		.required("Укажите почту")
		.email("Неверный формат почты"),
	password: Yup.string()
		.required("укажите пароль")
		.min(5, "Длина пароля не пенее 5 символов"),
});
