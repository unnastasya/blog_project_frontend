import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOnePost } from "../api/posts";
import { AddComment } from "../components/AddComment/AddComment";
import { Post } from "../components/Post/Post";
import { SideBlock } from "../components/SideBlock/SideBlock";
import { SideComments } from "../components/SideComments/SideComments";
import { PostType } from "../types/postType";
import Skeleton from "@mui/material/Skeleton";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


export function FullPost() {
	const [post, setData] = useState<PostType>();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		console.log(id);

		getOnePost(id || "").then((res) => {
			setData(res);
			setIsLoading(false);
		});
	}, [id]);


	if (isLoading) {
		return <Skeleton variant="rectangular" width="100%" height={500} />;
	}
	return (
		<div >
			{post && (
				<Post
                post={post}
					// id={post._id}
					// title={post.title}
					// imageUrl={`http://localhost:4444${post.imageUrl}`}
					// user={post.user}
					// createdAt={post.createdAt}
					// viewsCount={post.viewsCount}
					// commentsCount={post.commentsCount}
					// tags={post.tags}
					isFullPost={true}
				>
					{" "}
                    <ReactMarkdown children={post.text} />
				</Post>
			)}
			<SideBlock title="Комментарии">
				<SideComments
				/>
				<AddComment />
			</SideBlock>
		</div>
	);
}
