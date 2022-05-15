import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/jwt-auth';

@Module({
	imports: [
		MongooseModule.forRoot(dbUrl),
		AuthorizationModule,
		UserModule,
	],
})
export class AppModule {}
