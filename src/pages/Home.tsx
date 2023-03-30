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
	TagsSelector,
} from "../store/posts";
import { PostType } from "../types/postType";
import { PostSkeleton } from "../components/Post/PostSkeleton";
import { DataSelector } from "../store/auth";

const Home = () => {
	const dispatch = useAppDispatch();
	const posts: PostType[] = useAppSelector(PostsArraySelector);
	const tags: string[] = useAppSelector(TagsSelector);
	const isLoadingPosts: boolean = useAppSelector(isLoadingPostsSelector);
	const userData = useAppSelector(DataSelector);
	const comments: any[] = useAppSelector(lastCommentsSelector);

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
        console.log(comments)
	}, [fetchPosts, dispatch]);

	return (
		<div>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{isLoadingPosts && <PostSkeleton key={0} />}
					{posts.map((post: PostType) => (
						<Post
							key={post._id}
							id={post._id}
							title={post.title}
							imageUrl={
								post.imageUrl
									? `http://localhost:4444${post.imageUrl}`
									: ""
							}
							user={post.user}
							createdAt={post.createdAt}
							viewsCount={post.viewsCount}
							commentsCount={post.commentsCount}
							tags={post.tags}
							isEditable={userData?._id === post.user._id}
							isFullPost={post.isFullPost}
						/>
					))}
				</Grid>
				<Grid xs={4} item>
					<SideBlock title="Тэги">
						<List>
							{tags.map((tag: string) => (
								<ListItem disablePadding>
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
					<SideBlock title="Комментарии">
						<SideComments items={comments} />
					</SideBlock>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
