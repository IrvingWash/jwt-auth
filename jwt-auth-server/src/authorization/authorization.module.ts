import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthorizationController } from './authorization.contoller';
import { AuthorizationService } from './authorization.service';
import { MailService } from './mail.service';
import { Token, TokenSchema } from './schema/token.schema';
import { TokenService } from './token.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Token.name,
				schema: TokenSchema,
			},
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [AuthorizationController],
	providers: [
		AuthorizationService,
		MailService,
		TokenService,
	],
})
export class AuthorizationModule {}
