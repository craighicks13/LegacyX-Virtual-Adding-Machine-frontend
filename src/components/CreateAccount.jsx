import {
	createUserWithEmailAndPassword,
	getAuth,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const createAccount = useCallback(
		(e) => {
			if (e) e.preventDefault();
			setError('');

			if (!email) {
				setError('Email is requried');
				return;
			}

			if (!validateEmail(email)) {
				setError('Email is invalid');
				return;
			}

			if (!password) {
				setError('Password is required');
				return;
			}

			if (password !== confirmPassword) {
				setError('Passwords do not match');
				return;
			}

			try {
				createUserWithEmailAndPassword(getAuth(), email, password)
					.then((userAuth) => {
						navigate('/');
					})
					.catch((err) => {
						setError(err.name + ' ' + err.code);
					});
			} catch (err) {
				console.log('error:', err);
			}
		},
		[email, password, confirmPassword, navigate]
	);

	useEffect(() => {
		const keyDownHandler = (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				createAccount();
			}
		};

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [createAccount]);

	return (
		<>
			<div className="flex gap-2 flex-col max-w-xs mx-auto">
				<h1>Log in</h1>
				{error && (
					<p className="bg-red-500 rounded-md text-white p-2 text-sm">
						{error}
					</p>
				)}
				<input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="confirm password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button className="btn" onClick={createAccount}>
					Create Account
				</button>
				<span className="border-t-2 my-5"></span>
				<Link className="btn" to="/">
					Already have an account? Log In here
				</Link>
			</div>
		</>
	);
};

export default CreateAccount;
