import axios from 'axios';

import { AuthResponse } from '../models/response/auth-response';

export const baseUrl = 'http://localhost:3333';

const api = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
	if (config.headers === undefined) {
		return;
	}

	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

	return config;
});

api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		if (/* error.response.status === 401 && */ error.config && !error.config._isRetry) {
			const originalRequest = error.config;
	
			originalRequest._isRetry = true;
	
			try {
				const response = await axios.get<AuthResponse>(
					`${baseUrl}/auth/refresh`,
					{ withCredentials: true }
				);
	
				localStorage.setItem('token', response.data.accessToken);
	
				return api.request(originalRequest);
	
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				throw new Error(error);
			}
		}

		throw new Error(error);
	}
);

export default api;
