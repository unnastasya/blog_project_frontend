import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import React from "react";

import "./SideComments.css";

interface SideCommentsProps {
	items: any[];
}

export function SideComments({ items }: SideCommentsProps) {
	return (
		<List>
			{items.map((obj) => (
				<React.Fragment key={obj.id}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar
								alt={obj.user.fullName}
								src={obj.user.avatarUrl}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={obj.user.fullName}
							secondary={obj.text}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
				</React.Fragment>
			))}
		</List>
	);
}
