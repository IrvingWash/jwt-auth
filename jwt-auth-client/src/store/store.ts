import { makeAutoObservable } from 'mobx';

import { IUser } from '../models/IUser';
import AuthService from '../services/auth-servoce';

export class Store {
	public user: IUser | null = null;
	public isAuth = false;

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

	public async logOut(): Promise<void> {
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

	private _setAuth(value: boolean): void {
		this.isAuth = value;
	}

	private _setUser(user: IUser | null): void {
		this.user = user;
	}
}
