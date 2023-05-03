export type UserType = {
	[index: string]: any;
};

export type LoginUserType = {
	email: string;
	password: string;
};

export type RegisterUserType = {
	fullName: string;
	email: string;
	password: string;
	avatarUrl: string;
};
