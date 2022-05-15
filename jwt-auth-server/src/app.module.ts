import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/jwt-auth';

@Module({
	imports: [
		MongooseModule.forRoot(dbUrl),
	],
})
export class AppModule {}
