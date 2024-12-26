import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, createTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/ui/Spinner';
import BackButton from '../components/ui/BackButton';

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const [name] = useState(user?.name);
	const [email] = useState(user?.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);

	const handleChangeProduct = (e) => {
		setProduct(e.target.value);
	};
	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			dispatch(reset());
			navigate('/tickets');
		}

		dispatch(reset());
	}, [isError, isSuccess, dispatch, message, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newTicket = {
			product,
			description,
		};
		dispatch(createTicket(newTicket));
	};

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<BackButton url={'/'} />
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
						<button className='btn btn-primary'>Submit your ticket</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default NewTicket;
