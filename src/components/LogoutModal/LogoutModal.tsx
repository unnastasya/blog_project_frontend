import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../store";
import { AuthActions, isOpenLogoutModalSelector } from "../../store/auth";

import "./LogoutModal.css";

export function LogoutModal() {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(isOpenLogoutModalSelector);

	const handleCloseModal = () => {
		dispatch(AuthActions.changeIsOpenLogoutModal());
	};

	const logout = () => {
		dispatch(AuthActions.changeIsOpenLogoutModal());
		dispatch(AuthActions.logout());
	};

	const cancel = () => {
		dispatch(AuthActions.changeIsOpenLogoutModal());
	};

	return (
		<Modal open={isOpen} onClose={handleCloseModal}>
			<Box className="logoutModal">
				<div className="logout_div">
					<Typography variant="h6">
						Вы действительно хотите выйти?
					</Typography>
					<div className="modal_buttons">
						<Button variant="contained" onClick={cancel}>
							Отмена
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={logout}
						>
							Выйти
						</Button>
					</div>
				</div>
			</Box>
		</Modal>
	);
}
