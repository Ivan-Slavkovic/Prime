import axios from 'axios';

export const postRequest = (data) => {
	return axios.post('http://localhost:3006/users', data);
};

export const getRequest = () => {
	return axios.get('http://localhost:3006/users');
};

export const deleteRequest = (id) => {
	return axios.delete(`http://localhost:3006/users/${id}`);
};

export const getOneUser = (id) => {
	return axios.get(`http://localhost:3006/users/${id}`);
};

export const updateUser = (id, data) => {
	return axios.put(`http://localhost:3006/users/${id}`, data);
};
