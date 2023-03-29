import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import Header from "../Header/Header";

import "./Page.css";

interface PageProps {
	children: React.ReactNode;
}

export function Page(props: PageProps) {
	return (
		<div className="page">
			<Header />
			<div className="page_content">
				<Container maxWidth="lg">
					<Outlet />
					{props.children}
				</Container>
			</div>
		</div>
	);
}
