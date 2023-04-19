import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./SideComments.css";
import { getOnePostComments } from "../../api/comments";

interface SideCommentsProps {
	items?: any[];
}

export function SideComments({ items }: SideCommentsProps) {
	const { id } = useParams();

	const [comments, setComments] = useState<any[]>([]);
	console.log("comment id", id);
	useEffect(() => {
        const getComments = async () => {
            const data = await getOnePostComments(id || 0)
            setComments(data)
        };
        getComments();

	}, []);


	return (
		<List className="sideComments">
			{items
				? items.map((obj) => (
						<React.Fragment>
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
				  ))
				: comments.map((obj) => (
						<React.Fragment>
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
