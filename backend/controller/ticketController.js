const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc 		Get user tickets
// @route 	GET /api/tickets
// @access 	Private
const getTickets = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const tickets = await Ticket.find({ user: req.user.id });
	res.status(200);
	res.json(tickets);
});

// @desc 		Get user single ticket
// @route 	GET /api/tickets/:id
// @access 	Private
const getTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorized');
	}
	res.status(200);
	res.json(ticket);
});

// @desc 		Create a ticket
// @route 	POST /api/tickets
// @access 	Private

const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;

	if (!product || !description) {
		res.status(400);
		throw new Error('Please add a product and description');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.create({
		product,
		description,
		user: req.user.id,
	});

	res.status(201);
	res.json(ticket);
});

// @desc 		Delete ticket
// @route 	DELETE /api/tickets/:id
// @access 	Private
const deleteTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorized');
	}

	await Ticket.deleteOne({ id: req.params.id });
	res.status(200);
	res.json({ success: true });
});

// @desc 		Update ticket
// @route 	UPDATE /api/tickets/:id
// @access 	Private
const updateTicket = asyncHandler(async (req, res) => {
	// Get user using the id in the JWT

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error('Ticket not found');
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not Authorized');
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200);
	res.json(updatedTicket);
});

module.exports = {
	getTickets,
	getTicket,
	createTicket,
	deleteTicket,
	updateTicket,
};
