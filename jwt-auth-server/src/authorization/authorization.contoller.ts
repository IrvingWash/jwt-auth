import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Redirect,
	Req,
	Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { AuthorizationService, SigningResult } from './authorization.service';
import { SignInDto } from './dto/sign-in.dto';
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
	): Promise<SigningResult> {
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
	public async signIn(
		@Res({ passthrough: true })
		response: Response,

		@Body()
		dto: SignInDto
	): Promise<SigningResult> {
		const signInResult = await this._authorizationService.signIn({ ...dto });

		response.cookie(
			'refreshToken',
			signInResult.refreshToken,
			{
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}
		);

		return signInResult;
	}

	@Post('/sign-out')
	public async signOut(
		@Req()
		request: Request,

		@Res({ passthrough: true })
		response: Response
	): Promise<string> {
		const refreshToken = request.cookies['refreshToken'];

		console.log(request.cookies);

		const token = await this._authorizationService.signOut(refreshToken);

		response.clearCookie('refreshToken');

		return token;
	}

	@Get('activate/:link')
	@Redirect(process.env.CLIENT_URL, 302)
	public async activate(
		@Param('link')
		link: string
	): Promise<object> {
		await this._authorizationService.activate(`${process.env.API_URL}/auth/activate/${link}`);

		return { url: process.env.CLIENT_URL };
	}

	@Get('/refresh')
	public async refresh(): Promise<void> {
		return;
	}
}
