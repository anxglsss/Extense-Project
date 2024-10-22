export interface LoginUserDto {
	email: string
	password: string
}
export interface RegisterUserDto {
	name: string
	email: string
	password: string
	role?: 'USER' | 'ADMIN'
}
