import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const [name] = useState(user?.name);
	const [email] = useState(user?.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState('');

	const handleChangeProduct = (e) => {
		setProduct(e.target.value);
	};
	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newTicket = {
			name,
			email,
			product,
			description,
		};
		console.log(newTicket);
	};
	return (
		<>
			<section className='heading'>
				<h1>New ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className='form'>
				<div className='form-group'>
					<label htmlFor='name'>Customer Name</label>
					<input
						type='text'
						className='form-group'
						id='name'
						value={name}
						disabled
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Customer Email</label>
					<input
						type='email'
						className='form-group'
						id='email'
						value={email}
						disabled
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='product'>Customer Product</label>
						<select
							name='product'
							id='product'
							className='form-control'
							value={product}
							onChange={handleChangeProduct}>
							<option value='iPhone'>iPhone</option>
							<option value='iPad'>iPad</option>
							<option value='MacBook Pro'>MacBook Pro</option>
							<option value='iMac'>iMac</option>
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='description'> Customer Description</label>
						<textarea
							name='description'
							id='description'
							className='form-control'
							placeholder='Description'
							value={description}
							onChange={handleChangeDescription}></textarea>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className='btn btn-primary'>
							Submit your ticket
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default NewTicket;
