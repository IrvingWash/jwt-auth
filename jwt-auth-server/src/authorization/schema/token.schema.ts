import {
	Prop,
	Schema,
	SchemaFactory,
} from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type TokenDocument = Token & mongoose.Document;

@Schema()
export class Token {
	@Prop({
		ref: 'User',
	})
	public user: mongoose.Schema.Types.ObjectId;

	@Prop({
		required: true,
	})
	public refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
