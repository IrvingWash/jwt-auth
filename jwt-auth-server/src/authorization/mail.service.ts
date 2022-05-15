import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	public async sendActivationMail(to: string, link: string): Promise<void> {
		return;
	}
}
