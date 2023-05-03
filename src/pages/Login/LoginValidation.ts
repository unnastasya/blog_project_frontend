import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Укажите почту")
		.email("Неверный формат почты"),
	password: Yup.string().required("укажите пароль"),
});
