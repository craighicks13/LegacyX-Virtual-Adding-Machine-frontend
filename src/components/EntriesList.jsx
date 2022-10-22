import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEntries } from '../store/entriesSlice';
import JournalItem from '../components/JournalItem';
import { Link, useNavigate } from 'react-router-dom';

const Entries = () => {
	const state = useSelector((state) => state);
	const { entries, user } = state;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || !user.uid) {
			navigate('/');
			return;
		}
		const controller = new AbortController();
		dispatch(
			fetchAllEntries(user.uid, {
				abortController: controller.signal,
			})
		);
		return () => controller.abort();
	}, [dispatch, navigate, user]);

	return (
		<>
			{entries.status === 'error' && (
				<div className="bg-red-400 p-5 mb-10 rounded text-white">
					{`There was an error loading entries`}
				</div>
			)}

			{entries.status === 'loading' ? (
				<div className="p-5 bg-neutral-600 text-white rounded justify-center flex">
					{entries.message}
				</div>
			) : (
				<>
					<div className="">
						<Link className="btn" to={`/entry/new`}>
							New Entry
						</Link>
					</div>
					<div className="my-5 sm:my-10 pt-5 border-t-2">
						{!entries.data.length ? (
							<span className="flex justify-center text-neutral-500 italic">
								You have no journal entries
							</span>
						) : (
							entries.data.map((data, id) => {
								return (
									<JournalItem
										key={id}
										num={data.entry_num}
										date={data.date}
										memo={data.memo}
									/>
								);
							})
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Entries;
