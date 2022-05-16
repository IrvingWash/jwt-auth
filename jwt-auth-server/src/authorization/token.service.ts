import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { Token, TokenDocument } from './schema/token.schema';

interface TokenSet {
	accessToken: string;
	refreshToken: string;
}

interface TokenGeneratorPayload {
	email: string;
	id: string;
}

@Injectable()
export class TokenService {
	private _accessSecret = process.env.JWT_ACCESS_SECRET;
	private _refreshSecret = process.env.JWT_REFRESH_SECRET;

	public constructor(
		@InjectModel(Token.name)
		private _tokenModel: Model<TokenDocument>,
	) {}

	public generateTokens(payload: TokenGeneratorPayload): TokenSet {
		if (
			this._accessSecret === undefined ||
			this._refreshSecret === undefined
		) {
			throw new Error('Secret is not provided');
		}

		const accessToken = jwt.sign(
			payload,
			this._accessSecret,
			{ expiresIn: '30m' }
		);

		const refreshToken = jwt.sign(
			payload,
			this._refreshSecret,
			{ expiresIn: '30d' }
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	public async saveToken(userId: ObjectId, refreshToken: string): Promise<Token> {
		const tokenData = await this._tokenModel.findOne({ user: userId });

		if (tokenData !== null) {
			tokenData.refreshToken = refreshToken;

			await tokenData.save();

			return tokenData;
		}

		const token = await this._tokenModel.create({
			user: userId,
			refreshToken,
		});

		return token;
	}

	public async removeToken(refreshToken: string): Promise<string> {
		const tokenData = await this._tokenModel.findOneAndDelete({ refreshToken });

		if (tokenData === null) {
			throw new Error('Token not found');
		}

		return tokenData?.refreshToken;
	}
}
