import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth);
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error('Please include all the fields');
		} else {
			const userData = {
				email,
				password,
			};

			dispatch(login(userData));
		}
	};
	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login to get support</p>
			</section>

			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Enter Email *</label>
						<input
							className='form-control'
							name='email'
							type='email'
							id='email'
							placeholder='Enter Email'
							value={email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Enter Password *</label>
						<input
							className='form-control'
							name='password'
							type='password'
							id='password'
							placeholder='Enter Password'
							value={password}
							onChange={handleChange}
							required
						/>
					</div>
					<button
						type='submit'
						className='btn'>
						Login
					</button>
				</form>
			</section>
		</>
	);
}

export default Login;
