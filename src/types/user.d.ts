export interface User {
	_id: string;
	createdAt: string;
	email: string;
	firstName: string;
	lastName: string;
	updatedAt: string;
}

export interface GetUserResponse {
	message: string;
	user: User;
}
