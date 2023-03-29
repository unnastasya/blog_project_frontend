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
	commentsCount: number;
	tags: string[];
	isFullPost: boolean;
    comments: any[]
};
