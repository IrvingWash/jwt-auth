import { IsEmail, Length } from 'class-validator';

export class SignUpDto {
	@IsEmail()
	public readonly email: string;

	@Length(6, 32)
	public readonly password: string;
}
