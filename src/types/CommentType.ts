export type CommentType = {
	id: number;
	user: {
		fullName: string;
		avatarUrl: string;
		id: string;
	};
	text: string;
	postId: string;
};
