import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOnePost } from "../../api/posts";
import { AddComment } from "../../components/AddComment/AddComment";
import { Post } from "../../components/Post/Post";
import { SideBlock } from "../../components/SideBlock/SideBlock";
import { SideComments } from "../../components/SideComments/SideComments";
import { PostType } from "../../types/PostType";
import Skeleton from "@mui/material/Skeleton";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getOnePostComments } from "../../api/comments";
import { CommentType } from "../../types/CommentType";
import { isAuthUserSelector } from "../../store/auth";
import { useAppSelector } from "../../store";

export function FullPost() {
	const { id } = useParams();
	const isAuth = useAppSelector(isAuthUserSelector);
	const [post, setData] = useState<PostType>();
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState<CommentType[]>([]);

	useEffect(() => {
		getOnePostComments(id || "").then((res) => {
			setComments(res);
		});
	}, [setComments, id]);

	useEffect(() => {
		getOnePost(id || "").then((res) => {
			setData(res);
			setIsLoading(false);
		});
	}, [id]);

	if (isLoading) {
		return <Skeleton variant="rectangular" width="100%" height={500} />;
	}

	return (
		<div>
			{post && (
				<Post post={post} isFullPost={true}>
					{" "}
					<ReactMarkdown children={post.text} />
				</Post>
			)}
			<SideBlock title="Комментарии">
				<SideComments isFullPost={true} comments={comments} />
				{isAuth && <AddComment />}
			</SideBlock>
		</div>
	);
}
