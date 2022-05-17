import { AxiosResponse  } from 'axios';

import api from '../http';
import { AuthResponse } from '../models/response/auth-response';

export default class AuthService {
	public static async signIn(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('auth/sign-in', { email, password });
	}

	public static async signUp(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('auth/sign-up', { email, password });
	}

	public static async logOut(): Promise<void> {
		api.post<AuthResponse>('auth/sign-out');
	}
}
