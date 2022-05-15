import {
	Prop,
	Schema,
	SchemaFactory,
} from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
	@Prop({
		unique: true,
		required: true,
	})
	public email: string;

	@Prop({
		required: true,
	})
	public password: string;

	@Prop({
		required: true,
		default: false,
	})
	public isActivated: boolean;

	@Prop()
	public activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
