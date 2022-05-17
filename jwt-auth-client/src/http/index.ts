import axios from 'axios';

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

export default api;
