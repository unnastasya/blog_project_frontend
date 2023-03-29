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

const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthUserSelector);
	const dataUser = useAppSelector(DataSelector);

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
							{dataUser.avatarUrl && (
								<img
									className="userInfo_avatar"
									src={dataUser.avatarUrl}
									alt={dataUser.fullName}
								/>
							)}
							<p className="header_text">{dataUser.fullName}</p>
						</div>
					)}
					<div className="header_buttons">
						{isAuth ? (
							<>
								<Link
									to="/add-post"
									style={{ textDecoration: "none" }}
								>
									<Button variant="contained">
										Написать статью
									</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link
									to="/login"
									style={{ textDecoration: "none" }}
								>
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link
									to="/register"
									style={{ textDecoration: "none" }}
								>
									<Button variant="contained">
										Создать аккаунт
									</Button>
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
