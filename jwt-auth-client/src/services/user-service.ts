import { AxiosResponse } from 'axios';

import api from '../http';
import { IUser } from '../models/IUser';

export class UserService {
	public static async users(): Promise<AxiosResponse<IUser[]>> {
		return api.get<IUser[]>('/users');
	}
}
