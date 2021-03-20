import axios, { AxiosInstance } from 'axios';

export const prod = 'https://api.tylerkennedy.com';
export const local = 'https://localhost:44364';

// get base url each time called, to allow API switching across all calls (NOT FULLY IMPLEMENTED)
export function getBaseURL() {
	return local;
}

// provide singleton to all instances/api files
// used for refresh tokens and such later if necessary
export const AxiosConfig = () => {
	var instance: AxiosInstance;
	const getInstance = () => {
		if (!instance) instance = axios.create({ headers: { 'Access-Control-Allow-Origin': '*' } });
		instance.interceptors.request.use((request) => {
			request.baseURL = request.baseURL ?? getBaseURL();
			return request;
		});
		return instance;
	};
	return {
		instance: getInstance,
	};
};

export default AxiosConfig();
