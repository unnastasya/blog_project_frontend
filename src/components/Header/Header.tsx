import React from "react";
import { Avatar, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import {
	AuthActions,
	userDataSelector,
	isAuthUserSelector,
} from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { styled } from "@mui/material/styles";

import "../Header/Header.css";

const BootstrapButton = styled(Button)({
	padding: "6px 5px",
});

const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const activeUser = useAppSelector(userDataSelector);
	const wimdowWidth = window.outerWidth;

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
					{activeUser && (
						<div className="header_user">
							{activeUser?.avatarUrl && (
								<Avatar
									className="userInfo_avatar"
									src={activeUser.avatarUrl}
									alt={activeUser.fullName}
								/>
							)}
							{wimdowWidth > 480 && (
								<p className="header_text">
									{activeUser.fullName}
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
