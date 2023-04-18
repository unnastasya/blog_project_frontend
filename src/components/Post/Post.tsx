import React from "react";
import { UserInfo } from "../UserInfo/UserInfo";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import "./Post.css";
import { PostSkeleton } from "./PostSkeleton";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "../../store";
import { PostsActions } from "../../store/posts";
import { useDispatch } from "react-redux";
import { DataSelector } from "../../store/auth";
import { PostType } from "../../types/postType";

interface PostProps {
	// id: number;
	// title: string;
	// createdAt: string;
	// imageUrl: string;
	// user: any;
	// viewsCount: number;
	// commentsCount: number;
	// tags: any;
	// children?: any;
	// isFullPost: any;
	// isLoading?: boolean;
	// isEditable?: boolean;
	post: PostType;
	children?: any;
}

export function Post({
	// id,
	// title,
	// createdAt,
	// imageUrl,
	// user,
	// viewsCount,
	// commentsCount,
	// tags,
	// children,
	// isFullPost,
	// isLoading,
	// isEditable,
	post,
	children,
}: PostProps) {
	const dispatch = useDispatch();
	const activeUser = useAppSelector(DataSelector);

	const onClickRemove = () => {
		console.log(post.user);
		dispatch(
			PostsActions.changeDeleteData({
				id: String(post._id),
				token: activeUser.token,
			})
		);
		dispatch(PostsActions.deletePost());
	};

	if (post.isLoading) {
		return <PostSkeleton />;
	}

	const clickTag = (tag: any) => {
		console.log(tag);
		dispatch(PostsActions.changeTagData(tag));
		dispatch(PostsActions.requestPostsWithTags());
	};

	return (
		<div className="post_root">
			{activeUser?._id === post.user._id && (
				<div className="editButtons">
					<Link to={`/posts/${post._id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{post.imageUrl && (
				<img
					className="post_image "
					src={`http://localhost:4444${post.imageUrl}`}
					alt={post.title}
				/>
			)}
			<div className="post_wrapper">
				<UserInfo {...post.user} additionalText={post.createdAt} />
				<div className="post_indention">
					<h2 className="post_title ">
						{post.isFullPost ? (
							post.title
						) : (
							<Link to={`/posts/${post._id}`}>{post.title}</Link>
						)}
					</h2>
					<ul className="post_tags">
						{post.tags.map((name: string) => (
							<li onClick={() => clickTag(name)} key={name}>
								#{name}
							</li>
						))}
					</ul>
					{children && <div className="post_content">{children}</div>}
					<ul className="post_postDetails">
						<li>
							<EyeIcon />
							<span>{post.viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{post.comments.length}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
