import axios from 'axios';

const API_URL = '/api/tickets/';

// Create a ticket
const createTicket = async (ticketData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, ticketData, config);

	return response.data;
};

// Get tickets
const getTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Get a single ticket
const getTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${API_URL}/${ticketId}`, config);

	return response.data;
};

// Update the single ticket
const updateTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${API_URL}/${ticketId}`, { status: 'closed' }, config);

	return response.data;
};

const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	updateTicket,
};

export default ticketService;
