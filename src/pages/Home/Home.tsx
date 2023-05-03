import React, { useCallback, useEffect } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import { Post } from "../../components/Post/Post";
import { SideComments } from "../../components/SideComments/SideComments";
import { useAppDispatch, useAppSelector } from "../../store";
import {
	allTagsSelector,
	isLoadingPostsSelector,
	lastCommentsSelector,
	PostsActions,
	PostsArraySelector,
	tagsRequestSelector,
} from "../../store/posts";
import { PostType } from "../../types/PostType";
import { PostSkeleton } from "../../components/Post/PostSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { CommentType } from "../../types/CommentType";

import "./Home.css";
import { SideTags } from "../../components/SideTags/SideTags";

const Home = () => {
	const dispatch = useAppDispatch();
	const activeTag = useAppSelector(tagsRequestSelector);
	const posts: PostType[] = useAppSelector(PostsArraySelector);
	const tags: string[] | undefined = useAppSelector(allTagsSelector);
	const isLoadingPosts: boolean = useAppSelector(isLoadingPostsSelector);
	const comments: CommentType[] = useAppSelector(lastCommentsSelector);

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
	}, [fetchPosts, fetchTags, fetchComments]);

	const closeTagFilter = () => {
		dispatch(PostsActions.changeTagData(""));
		fetchPosts();
	};

	return (
		<div className="homePage">
			<div className="homePage__posts">
				{activeTag && (
					<div className="tagsFilter">
						<div className="activeTag"># {activeTag}</div>
						<CloseIcon onClick={closeTagFilter} />
					</div>
				)}
				{isLoadingPosts && <PostSkeleton key={0} />}
				{posts.map((post: PostType) => (
					<Post key={post._id} post={post} isFullPost={false} />
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
							<SideTags tags={tags} />
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
						<AccordionDetails>
							<SideComments comments={comments} />
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default Home;
