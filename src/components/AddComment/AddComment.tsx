import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../store";
import { DataSelector } from "../../store/auth";
import qs from "qs";

import "./AddComment.css";

export function AddComment() {
	const user = useAppSelector(DataSelector);
	const [comment, setComment] = useState<string>("");
	const { id } = useParams();

	const addComment = () => {
		console.log("comment", comment);
		const field = {
			user: { fullName: user.fullName, avatarUrl: user.avatarUrl },
			comment: comment,
		};

		console.log("user", field);
		axios
			.post(
				`http://localhost:4444/posts/addComment/${id}`,
				qs.stringify(field),
				{
					headers: {
						authorization: window.localStorage.getItem("token"),
					},
				}
			)
			.then((response) => response.data);
	};

	const onChange = (comment: string) => {
		setComment(comment);
	};

	console.log("id", id);

	return (
		<>
			<div className="addComment_root">
				<Avatar className="addComment_avatar" src={user.avatarUrl} />
				<div className="addComment_form">
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						multiline
						value={comment}
						onChange={(e) => onChange(e.target.value)}
						fullWidth
					/>
					<Button variant="contained" onClick={addComment}>
						Отправить
					</Button>
				</div>
			</div>
		</>
	);
}
