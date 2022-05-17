import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import { IUser } from '../models/IUser';
import AuthService from '../services/auth-service';
import { AuthResponse } from '../models/response/auth-response';
import { baseUrl } from '../http';

export class Store {
	public user: IUser | null = null;
	public isAuth = false;
	public isLoading = false;

	public constructor() {
		makeAutoObservable(this);
	}

	public async signIn(email: string, password: string): Promise<void> {
		try {
			const response = await AuthService.signIn(email, password);

			localStorage.setItem('token', response.data.accessToken);

			this._setAuth(true);

			this._setUser(response.data.user);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new Error(error.response?.data?.message);
		}
	}

	public async signUp(email: string, password: string): Promise<void> {
		try {
			const response = await AuthService.signUp(email, password);

			localStorage.setItem('token', response.data.accessToken);

			this._setAuth(true);

			this._setUser(response.data.user);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new Error(error.response?.data?.message);
		}
	}

	public async signOut(): Promise<void> {
		try {
			await AuthService.logOut();

			localStorage.removeItem('token');

			this._setAuth(false);

			this._setUser(null);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new Error(error.response?.data?.message);
		}
	}

	public async checkAuth(): Promise<void> {
		this._setLoading(true);

		try {
			const response = await axios.get<AuthResponse>(
				`${baseUrl}/auth/refresh`,
				{ withCredentials: true }
			);

			localStorage.setItem('token', response.data.accessToken);

			this._setAuth(true);

			this._setUser(response.data.user);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new Error(error.response?.data?.message);
		} finally {
			this._setLoading(false);
		}
	}

	private _setAuth(value: boolean): void {
		this.isAuth = value;
	}

	private _setUser(user: IUser | null): void {
		this.user = user;
	}

	private _setLoading(value: boolean): void {
		this.isLoading = value;
	}
}
