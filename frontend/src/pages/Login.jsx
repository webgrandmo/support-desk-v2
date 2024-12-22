import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect when logged in
		if (user || isSuccess) {
			navigate('/');
			toast.success('Login successful');
		}

		// dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
		// if (email === '' || password === '') {
		// 	toast.error('Please include all the fields');
		// } else {

		// }
	};

	if (isLoading) {
		return <Spinner />;
	}
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
