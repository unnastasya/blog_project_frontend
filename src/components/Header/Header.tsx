import React from "react";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import {
	AuthActions,
	DataSelector,
	isAuthUserSelector,
} from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { LogoutModal } from "../LogoutModal/LogoutModal";

import "../Header/Header.css";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
	padding: "6px 5px",
});

const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const dataUser = useAppSelector(DataSelector);
	const width = window.outerWidth;

	const onClickLogout = () => {
		dispatch(AuthActions.changeIsOpenLogoutModal());
	};

	return (
		<div className="header_root">
			<LogoutModal />
			<Container maxWidth="lg">
				<div className="header_inner">
					<a className="header_logo" href="/">
						<div>BLOG</div>
					</a>
					{dataUser && (
						<div className="header_user">
							{dataUser?.avatarUrl && (
								<img
									className="userInfo_avatar"
									src={dataUser.avatarUrl}
									alt={dataUser.fullName}
								/>
							)}
							{width > 480 && (
								<p className="header_text">
									{dataUser.fullName}
								</p>
							)}
						</div>
					)}
					<div className="header_buttons">
						{isAuth ? (
							<>
								<Link
									to="/add-post"
									style={{ textDecoration: "none" }}
								>
									<BootstrapButton
										className="homePage__button"
										variant="contained"
									>
										Написать статью
									</BootstrapButton>
								</Link>
								<BootstrapButton
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Выйти
								</BootstrapButton>
							</>
						) : (
							<>
								<Link
									to="/login"
									style={{ textDecoration: "none" }}
								>
									<BootstrapButton variant="outlined">
										Войти
									</BootstrapButton>
								</Link>
								<Link
									to="/register"
									style={{ textDecoration: "none" }}
								>
									<BootstrapButton variant="contained">
										Создать аккаунт
									</BootstrapButton>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Header;
