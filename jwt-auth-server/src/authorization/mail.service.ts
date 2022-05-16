import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
	private _transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	public async sendActivationMail(to: string, link: string): Promise<void> {
		await this._transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Account activation',
			text: '',
			html:
				`
					<div>
						<h1>To activate your account follow the link below</h1>
						<a href="${link}">${link}</a>
					</div>
				`,
		});
	}
}
