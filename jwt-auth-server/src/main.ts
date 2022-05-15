import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

config();
const port = process.env.PORT || 3333;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	app.enableCors();

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}

bootstrap();
