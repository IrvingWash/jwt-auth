import { IsEmail, Length } from 'class-validator';

export class SignInDto {
	@IsEmail()
	public readonly email: string;

	@Length(6, 32)
	public readonly password: string;
}
