import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOnePost } from "../api/posts";
import { AddComment } from "../components/AddComment/AddComment";
import { Post } from "../components/Post/Post";
import { PostSkeleton } from "../components/Post/PostSkeleton";
import { SideBlock } from "../components/SideBlock/SideBlock";
import { SideComments } from "../components/SideComments/SideComments";
import { useAppDispatch, useAppSelector } from "../store";
import { OnePostSelector, PostsActions } from "../store/posts";
import { PostType } from "../types/postType";
import Skeleton from "@mui/material/Skeleton";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import axios from "axios";

export function FullPost() {
	const [post, setData] = useState<PostType>();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
    const comments = post?.comments || []

	useEffect(() => {
		console.log(id);

		getOnePost(id || "").then((res) => {
			setData(res);
			setIsLoading(false);
		});
	}, []);


	if (isLoading) {
		return <Skeleton variant="rectangular" width="100%" height={500} />;
	}
	return (
		<div >
			{post && (
				<Post
					id={post._id}
					title={post.title}
					imageUrl={`http://localhost:4444${post.imageUrl}`}
					user={post.user}
					createdAt={post.createdAt}
					viewsCount={post.viewsCount}
					commentsCount={post.commentsCount}
					tags={post.tags}
					isFullPost={post.isFullPost}
				>
					{" "}
                    <ReactMarkdown children={post.text} />
				</Post>
			)}
			<SideBlock title="Комментарии">
				<SideComments
					items={comments}
				/>
				<AddComment />
			</SideBlock>
		</div>
	);
}