import { Paper, Typography } from "@mui/material";
import React from "react";

import "./SideBlock.css";

interface SideBlockProps {
	title?: string;
	children: React.ReactNode;
}

export function SideBlock({ title, children }: SideBlockProps) {
	return (
		<Paper className="sideBlock_root">
			{title && (
				<Typography variant="h6" className="sideBlock_title">
					{title}
				</Typography>
			)}
			{children}
		</Paper>
	);
}
