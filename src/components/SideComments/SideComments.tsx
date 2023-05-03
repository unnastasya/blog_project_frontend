import React, { useEffect } from "react";
import {
	Avatar,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { PostsActions, onePostCommentsSelector } from "../../store/posts";
import { SideBlock } from "../SideBlock/SideBlock";
import DeleteIcon from "@mui/icons-material/Clear";
import { userDataSelector } from "../../store/auth";
import { CommentType } from "../../types/CommentType";
import axios from "axios";

import "./SideComments.css";

interface SideCommentsProps {
	comments?: CommentType[];
	isFullPost?: boolean;
}

export function SideComments({
	comments,
	isFullPost = false,
}: SideCommentsProps) {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const navigate = useNavigate();
	const activeUser = useAppSelector(userDataSelector);
	const commentsRedux = useAppSelector(onePostCommentsSelector);

	useEffect(() => {
		dispatch(PostsActions.changeRequestsPostIdData(id || ""));
		if (isFullPost) {
			dispatch(PostsActions.getOnePostComments());
		}
	}, [isFullPost, dispatch, id]);

	const clickComment = (id: string) => {
		navigate(`/posts/${id}`);
	};

	const onClickRemove = async (commentId: number) => {
		await axios.delete(
			`http://localhost:4444/post/${id}/comments/${commentId}`,
			{
				headers: {
					authorization: window.localStorage.getItem("token"),
				},
			}
		);
		dispatch(PostsActions.requestOnePost());
	};

	return (
		<SideBlock>
			<List>
				{isFullPost &&
					commentsRedux?.map((obj) => (
						<div key={obj.id}>
							<>
								<ListItem className="comment">
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
									{activeUser?._id === obj.user.id && (
										<div className="deleteButton">
											<IconButton
												onClick={() =>
													onClickRemove(obj.id)
												}
												color="secondary"
											>
												<DeleteIcon />
											</IconButton>
										</div>
									)}
								</ListItem>
								<Divider variant="middle" component="li" />
							</>
						</div>
					))}
				{!isFullPost &&
					comments?.map((obj) => (
						<div key={obj.id}>
							<>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => clickComment(obj.postId)}
									>
										<ListItemAvatar>
											<Avatar
												alt={obj.user.fullName}
												src={obj.user.avatarUrl}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={obj.user.fullName}
											secondary={
												obj.text.length > 20
													? obj.text.slice(0, 20) +
													  "..."
													: obj.text
											}
										/>
									</ListItemButton>
								</ListItem>
								<Divider variant="fullWidth" component="li" />
							</>
						</div>
					))}
			</List>
		</SideBlock>
	);
}
