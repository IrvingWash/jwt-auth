import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorizationController } from './authorization.contoller';
import { AuthorizationService } from './authorization.service';
import { Token, TokenSchema } from './schema/token.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Token.name,
				schema: TokenSchema,
			},
		]),
	],
	controllers: [AuthorizationController],
	providers: [AuthorizationService],
})
export class AuthorizationModule {}
