import React, { useCallback, useEffect } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Post } from "../components/Post/Post";
import { SideBlock } from "../components/SideBlock/SideBlock";
import TagIcon from "@mui/icons-material/Tag";
import { SideComments } from "../components/SideComments/SideComments";
import { useAppDispatch, useAppSelector } from "../store";
import {
    allTagsSelector,
	isLoadingPostsSelector,
	lastCommentsSelector,
	PostsActions,
	PostsArraySelector,
	tagsRequestSelector,
} from "../store/posts";
import { PostType } from "../types/postType";
import { PostSkeleton } from "../components/Post/PostSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import "./Home.css";

const Home = () => {
	const dispatch = useAppDispatch();
	const posts: PostType[] = useAppSelector(PostsArraySelector);
	const tags: string[] | undefined = useAppSelector(allTagsSelector);
	const isLoadingPosts: boolean = useAppSelector(isLoadingPostsSelector);
	const comments: any[] = useAppSelector(lastCommentsSelector);
	const activeTag = useAppSelector(tagsRequestSelector);

	const fetchPosts = useCallback(() => {
		dispatch(PostsActions.requestPosts());
	}, [dispatch]);

	const fetchTags = useCallback(() => {
		dispatch(PostsActions.requestTags());
		dispatch(PostsActions.requestAllTags());
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

	const closeTagFilter = () => {
		dispatch(PostsActions.changeTagData(""));
		fetchPosts();
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
				{activeTag && (
					<div className="tagsFilter">
						<div className="activeTag"># {activeTag}</div>
						<CloseIcon onClick={closeTagFilter} />
					</div>
				)}
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
						isFullPost={false}
					/>
				))}
			</div>
			<div className="homePage__sides">
				<div className="homePage__tags">
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Тэги</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<SideBlock >
								<List>
									{tags?.map((tag: string) => (
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
						</AccordionDetails>
					</Accordion>
				</div>

				<div className="homePage__comments">
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Комментарии</Typography>
						</AccordionSummary>
						<AccordionSummary>
							<SideBlock title="">
								<SideComments items={comments} />
							</SideBlock>
						</AccordionSummary>
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default Home;
