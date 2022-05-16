import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

config();

const port = process.env.PORT || 3333;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	
	app.enableCors();

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}

bootstrap();
