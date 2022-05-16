import { Injectable, NestMiddleware } from '@nestjs/common';

import {
	NextFunction,
	Request,
	Response,
} from 'express';

import { TokenService } from 'src/authorization/token.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
	public constructor(
		private _tokenService: TokenService
	) {}

	public use(req: Request & { user: object }, res: Response, next: NextFunction): void {
		const authorizationHeader = req.headers.authorization;

		if (authorizationHeader === undefined) {
			throw new Error('Not authorized');
		}

		const accessToken = authorizationHeader.split(' ')[1];

		const userData = this._tokenService.validateAccessToken(accessToken);

		req.user = userData;

		next();
	}
}
