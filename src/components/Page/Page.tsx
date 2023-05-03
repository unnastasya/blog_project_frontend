import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";

import "./Page.css";

export function Page() {
	return (
		<div className="page">
			<Header />
			<div className="page_content">
				<Container maxWidth="lg">
					<Outlet />
				</Container>
			</div>
		</div>
	);
}
