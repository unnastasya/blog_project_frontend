import React, { useCallback, useEffect } from "react";
import {
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tab,
	Tabs,
} from "@mui/material";
import { Post } from "../components/Post/Post";
import { SideBlock } from "../components/SideBlock/SideBlock";
import TagIcon from "@mui/icons-material/Tag";
import { SideComments } from "../components/SideComments/SideComments";
import { useAppDispatch, useAppSelector } from "../store";
import {
	isLoadingPostsSelector,
	lastCommentsSelector,
	PostsActions,
	PostsArraySelector,
	tagsRequestSelector,
	TagsSelector,
} from "../store/posts";
import { PostType } from "../types/postType";
import { PostSkeleton } from "../components/Post/PostSkeleton";
import { DataSelector } from "../store/auth";

import "./Home.css";

const Home = () => {
	const dispatch = useAppDispatch();
	const posts: PostType[] = useAppSelector(PostsArraySelector);
	const tags: string[] = useAppSelector(TagsSelector);
	const isLoadingPosts: boolean = useAppSelector(isLoadingPostsSelector);
	const userData = useAppSelector(DataSelector);
	const comments: any[] = useAppSelector(lastCommentsSelector);
	const activeTag = useAppSelector(tagsRequestSelector);

	const fetchPosts = useCallback(() => {
		dispatch(PostsActions.requestPosts());
	}, [dispatch]);

	const fetchTags = useCallback(() => {
		dispatch(PostsActions.requestTags());
	}, [dispatch]);

	const fetchComments = useCallback(() => {
		dispatch(PostsActions.requestAllComments());
	}, [dispatch]);

	useEffect(() => {
		fetchPosts();
		fetchTags();
		fetchComments();
		console.log(comments);
	}, [fetchPosts, dispatch]);

	const clickTag = (tag: any) => {
		console.log(tag);
		dispatch(PostsActions.changeTagData(tag));
		dispatch(PostsActions.requestPostsWithTags());
	};

	return (
		<div className="homePage">
			{/* <Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs> */}
			<div className="homePage__posts">
				{activeTag && <div className="activeTag"># {activeTag}</div>}
				{isLoadingPosts && <PostSkeleton key={0} />}
				{posts.map((post: PostType) => (
					<Post
						key={post._id}
						// id={post._id}
						// title={post.title}
						// imageUrl={
						// 	post.imageUrl
						// 		? `http://localhost:4444${post.imageUrl}`
						// 		: ""
						// }
						// user={post.user}
						// createdAt={post.createdAt}
						// viewsCount={post.viewsCount}
						// commentsCount={post.commentsCount}
						// tags={post.tags}
						// isEditable={userData?._id === post.user._id}
						// isFullPost={post.isFullPost}
						post={post}
					/>
				))}
			</div>
			<div className="homePage__sides">
				<div className="homePage__tags">
					<SideBlock title="Тэги">
						<List>
							{tags.map((tag: string) => (
								<ListItem
									disablePadding
									onClick={() => clickTag(tag)}
								>
									<ListItemButton>
										<ListItemIcon>
											<TagIcon />
										</ListItemIcon>
										<ListItemText primary={tag} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</SideBlock>
				</div>
				<div className="homePage__comments">
					<SideBlock title="Комментарии">
						<SideComments items={comments} />
					</SideBlock>
				</div>
			</div>
		</div>
	);
};

export default Home;
