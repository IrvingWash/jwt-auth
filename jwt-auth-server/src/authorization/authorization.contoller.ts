import {
	Body,
	Controller,
	Get,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthorizationService, SignUpResult } from './authorization.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('/auth')
export class AuthorizationController {
	public constructor(
		private _authorizationService: AuthorizationService
	) {}

	@Post('sign-up')
	public async signUp(
		@Body()
		dto: SignUpDto,

		@Res({ passthrough: true })
		response: Response
	): Promise<SignUpResult> {
		const signUpResult = await this._authorizationService.signUp(dto);

		response.cookie(
			'refreshToken',
			signUpResult.refreshToken,
			{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}
		);

		return signUpResult;
	}

	@Post('/sign-in')
	public async signIn(): Promise<void> {
		return;
	}

	@Post('/sign-out')
	public async signOut(): Promise<void> {
		return;
	}

	@Get('activate/:link')
	public async activate(): Promise<void> {
		return;
	}

	@Get('/refresh')
	public async refresh(): Promise<void> {
		return;
	}
}
