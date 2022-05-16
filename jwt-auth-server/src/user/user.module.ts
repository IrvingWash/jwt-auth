import {
	MiddlewareConsumer,
	Module,
	NestModule,
} from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Token, TokenSchema } from 'src/authorization/schema/token.schema';
import { TokenService } from 'src/authorization/token.service';
import { AuthenticationMiddleware } from './authentication.middleware';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
			{
				name: Token.name,
				schema: TokenSchema,
			},
		]),
	],
	providers: [UserService, TokenService],
	controllers: [UserController],
})
export class UserModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthenticationMiddleware)
			.forRoutes('users');
	}
}
