import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Token, TokenDocument } from './schema/token.schema';

@Injectable()
export class AuthorizationService {
	public constructor(
		@InjectModel(Token.name)
		private tokenModel: Model<TokenDocument>
	) {}
}
