import {
	Controller,
	Get,
	Post,
} from '@nestjs/common';

import { AuthorizationService } from './authorization.service';

@Controller('/auth')
export class AuthorizationController {
	public constructor(
		private authorizationService: AuthorizationService
	) {}

	@Post('sign-up')
	public async signUp(): Promise<void> {
		return;
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
