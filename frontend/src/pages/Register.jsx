import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = formData;
	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		}
	};
	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='name'>Enter Name *</label>
						<input
							className='form-control'
							name='name'
							type='text'
							id='name'
							placeholder='Enter Name'
							value={name}
							onChange={handleChange}
							required
						/>
					</div>
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
					<div className='form-group'>
						<label htmlFor='confirmPassword'>Confirm password *</label>
						<input
							required
							className='form-control'
							name='confirmPassword'
							type='password'
							id='confirmPassword'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<button
						type='submit'
						className='btn'>
						Register
					</button>
				</form>
			</section>
		</>
	);
}

export default Register;
