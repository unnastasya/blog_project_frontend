import React from "react";
import { UserInfo } from "../UserInfo/UserInfo";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import "./Post.css";
import { PostSkeleton } from "./PostSkeleton";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../store";
import { PostsActions } from "../../store/posts";
import { useDispatch } from "react-redux";
import { DataSelector } from "../../store/auth";

interface PostProps {
	id: number;
	title: string;
	createdAt: string;
	imageUrl: string;
	user: any;
	viewsCount: number;
	commentsCount: number;
	tags: any;
	children?: any;
	isFullPost: any;
	isLoading?: boolean;
	isEditable?: boolean;
}

export function Post({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}: PostProps) {
	const dispatch = useDispatch();
	const activeUser = useAppSelector(DataSelector);

	const onClickRemove = () => {
		console.log(user);
		dispatch(
			PostsActions.changeDeleteData({
				id: String(id),
				token: activeUser.token,
			})
		);
		dispatch(PostsActions.deletePost());
	};

	if (isLoading) {
		return <PostSkeleton />;
	}

	return (
		<div className="post_root">
			{isEditable && (
				<div className="editButtons">
					<Link to={`/posts/${id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img className="post_image " src={imageUrl} alt={title} />
			)}
			<div className="post_wrapper">
				<UserInfo {...user} additionalText={createdAt} />
				<div className="post_indention">
					<h2 className="post_title ">
						{" "}
						{isFullPost ? (
							title
						) : (
							<Link to={`/posts/${id}`}>{title}</Link>
						)}
					</h2>
					<ul className="post_tags">
						{" "}
						{tags.map((name: string) => (
							<li key={name}>
								<a href={`/tag/${name}`}>#{name}</a>
							</li>
						))}
					</ul>
					{children && <div className="post_content">{children}</div>}
					<ul className="post_postDetails">
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
