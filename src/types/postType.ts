import { CommentType } from "./CommentType";

export type PostType = {
	[index: string]: any;
	id: number;
	title: string;
	text: string;
	imageUrl: string;
	user: {
		avatarUrl: string;
		fullName: string;
		_id: string;
		token: string;
	};
	createdAt: string;
	viewsCount: number;
	commentCount: number;
	commentsCount: number;
	comments: CommentType[];
	tags: string[];
	isFullPost: boolean;
};
