import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

const Login = () => {
	const [email, setEmail] = useState('demo@gmail.com');
	const [password, setPassword] = useState('1234567890');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const loginToApp = useCallback(
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

			try {
				signInWithEmailAndPassword(getAuth(), email, password)
					.then((userAuth) => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
							})
						);
						navigate('/entries');
					})
					.catch((err) => {
						setError(err.name + ' ' + err.code);
					});
			} catch (err) {
				console.log('error:', err);
			}
		},
		[email, password, dispatch, navigate]
	);

	useEffect(() => {
		const keyDownHandler = (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				loginToApp();
			}
		};

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [loginToApp]);

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
				<button className="btn" onClick={loginToApp}>
					Log In
				</button>
				<span className="border-t-2 my-5"></span>
				<Link className="btn" to="/create-account">
					Don't have an account? Create one here
				</Link>
			</div>
		</>
	);
};

export default Login;
