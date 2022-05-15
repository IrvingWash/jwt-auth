import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
	public constructor (
		private userService: UserService
	) {}

	@Get()
	public async users(): Promise<string> {
		return await this.userService.users();
	}
}
