import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { userDataSelector } from "../../store/auth";
import { PostsActions } from "../../store/posts";
import { CommentType } from "../../types/CommentType";
import axios from "axios";
import qs from "qs";

import "./AddComment.css";

export function AddComment() {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const activeUser = useAppSelector(userDataSelector);
	const [comment, setComment] = useState<string>("");

	useEffect(() => {
		dispatch(PostsActions.changeRequestsPostIdData(id || ""));
	}, []);

	const addComment = async (event: any) => {
		event.preventDefault();
		if (comment !== "") {
			const field: CommentType = {
				user: {
					fullName: activeUser.fullName,
					avatarUrl: activeUser.avatarUrl,
					id: activeUser._id,
				},
				text: comment,
				id: Number(Date.now()),
				postId: id || "",
			};
			await axios.post(
				`http://localhost:4444/comments/${field.postId}`,
				qs.stringify(field),
				{
					headers: {
						authorization: window.localStorage.getItem("token"),
					},
				}
			);
			dispatch(PostsActions.requestOnePost());
			setComment("");
		}
	};

	const onChange = (comment: string) => {
		setComment(comment);
	};

	return (
		<>
			<div onSubmit={addComment} className="addComment_root">
				<Avatar
					className="addComment_avatar"
					src={activeUser?.avatarUrl}
				/>
				<form className="addComment_form">
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						multiline
						value={comment}
						onChange={(e) => onChange(e.target.value)}
						fullWidth
						required
					/>
					<Button type="submit" variant="contained">
						Отправить
					</Button>
				</form>
			</div>
		</>
	);
}
