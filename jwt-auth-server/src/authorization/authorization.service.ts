import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { User, UserDocument } from 'src/user/schema/user.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { MailService } from './mail.service';
import { TokenService } from './token.service';
import { SignInDto } from './dto/sign-in.dto';

export interface SigningResult {
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		id: ObjectId;
		isActivated: boolean;
	}
}

@Injectable()
export class AuthorizationService {
	public constructor(
		@InjectModel(User.name)
		private _userModel: Model<UserDocument>,

		private _mailService: MailService,
		private _tokenService: TokenService,
	) {}

	public async signUp(dto: SignUpDto): Promise<SigningResult> {
		const { email, password } = dto;

		const candidate = await this._userModel.findOne({
			email, 
		});

		if (candidate !== null) {
			throw new Error('A user with this email already exists');
		}

		const salt = await bcrypt.genSalt(5);
		const hashedPassword = await bcrypt.hash(password, salt);
		const activationLink = `${process.env.API_URL}/auth/activate/${v4()}`;

		const user = await this._userModel.create({
			email,
			password: hashedPassword,
			activationLink,
		});

		await this._mailService.sendActivationMail(email, activationLink);

		const tokens = this._tokenService.generateTokens(
			{
				email: user.email,
				id: user._id,
			}
		);

		await this._tokenService.saveToken(user._id, tokens.refreshToken);

		return {
			...tokens,
			user: {
				email: user.email,
				id: user._id,
				isActivated: user.isActivated,
			},
		};
	}

	public async signIn(dto: SignInDto): Promise<SigningResult> {
		const { email, password } = dto;

		const user = await this._userModel.findOne({ email });

		if (user === null) {
			throw new Error('User not found');
		}

		const isPassEqual = await bcrypt.compare(password, user.password);

		if (!isPassEqual) {
			throw new Error('User not found');
		}

		const tokens = this._tokenService.generateTokens({
			email: user.email,
			id: user._id,
		});

		await this._tokenService.saveToken(user._id, tokens.refreshToken);

		return {
			...tokens,
			user: {
				email: user.email,
				id: user._id,
				isActivated: user.isActivated,
			},
		};
	}

	public async activate(activationLink: string): Promise<void> {
		const user =  await this._userModel.findOne({ activationLink });

		if (user === null) {
			throw new Error('Wrong activation link');
		}

		user.isActivated = true;

		await user.save();

		return;
	}
}
