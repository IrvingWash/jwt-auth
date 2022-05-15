import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schema/user.schema';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
	public constructor(
		@InjectModel(User.name)
		private _userModel: Model<UserDocument>
	) {}

	public async users(): Promise<string> {
		return 'hello world';
	}
}
