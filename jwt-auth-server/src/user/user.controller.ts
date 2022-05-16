import { Controller, Get } from '@nestjs/common';

import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
	public constructor (
		private _userService: UserService
	) {}

	@Get()
	public async users(): Promise<User[]> {
		return await this._userService.users();
	}
}
