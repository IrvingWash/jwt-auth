import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import { User, UserDocument } from 'src/user/schema/user.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { MailService } from './mail.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthorizationService {
	public constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,

		private mailService: MailService,
		private tokenService: TokenService,
	) {}

	public async signUp(dto: SignUpDto): Promise<User> {
		const { email, password } = dto;

		const candidate = await this.userModel.findOne({
			email, 
		});

		if (candidate !== null) {
			throw new Error('A user with this email already exists');
		}

		const hashedPassword = await bcrypt.hash(password, 'IW');
		const activationLink = v4();

		const user = await this.userModel.create({
			email,
			password: hashedPassword,
			activationLink,
		});

		await this.mailService.sendActivationMail(email, activationLink);

		return user;
	}
}
