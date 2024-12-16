const asyncHandler = require('express-async-handler');
const generateToken = require('./generateToken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc 		Register a new user
// @route 	/api/users
// @access 	Public
const userRegister = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc 		Login a user
// @route 	/api/users/login
// @access 	Public
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
	res.send('User Login');
});

// @desc 		Get a current user
// @route 	/api/users/me
// @access 	Private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};
	res.status(200);
	res.json(user);
});

module.exports = {
	userRegister,
	userLogin,
	getMe,
};
