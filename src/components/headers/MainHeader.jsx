import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearEntries } from '../../store/entriesSlice';
import { clearJournalEntry } from '../../store/entrySlice';
import { logout } from '../../store/userSlice';

const MainHeader = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const logOutApp = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				dispatch(clearJournalEntry());
				dispatch(clearEntries());
				dispatch(logout());
				navigate('/');
			})
			.catch((err) => {
				console.log('error logging out');
			});
	};
	return (
		<header className={`bg-primary`}>
			<div className="flex justify-between items-center p-2 sm:p-5 mx-auto text-xs sm:text-sm md:text-base">
				<span>My Simple Ledger</span>
				{user.uid && (
					<div>
						<button className="btn" onClick={logOutApp}>
							Logout, {user.email}
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default MainHeader;
