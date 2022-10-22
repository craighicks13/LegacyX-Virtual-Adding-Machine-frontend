import { IoClose as CloseButton } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	updateInput,
	clearJournalEntry,
} from '../../store/entrySlice';

const EntryHeader = () => {
	const state = useSelector((state) => state);
	const { entry } = state;
	const close = useNavigate();
	const dispatch = useDispatch();

	const cancelEdit = () => {
		dispatch(clearJournalEntry());
		close('/entries');
	};

	return (
		<>
			{entry.message && (
				<div
					className={`${
						entry.status === 'error' ? 'bg-red-400' : 'bg-green-500'
					} p-5 mb-10 rounded text-white text-center`}
				>
					{entry.message}
				</div>
			)}

			<div className="flex flex-row justify-between">
				<div className="font-bold text-lg">
					Jounal entry no.{' '}
					<span
						className={`${
							entry.entry_num === 'new' && 'text-neutral-400 italic'
						}  pl-2`}
					>
						{entry.entry_num}
					</span>
				</div>

				<div className="">
					<button
						className="icon-button h-full"
						onClick={() => cancelEdit()}
					>
						<CloseButton />
					</button>
				</div>
			</div>
			<div className="mt-5 flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center">
				<div className="text-xs font-bold gap-2">
					<span>Jounal date:</span>
					<span className="ml-2 font-normal">{entry.date}</span>
				</div>
				<div className="flex gap-2 place-items-center text-xs">
					<span className="font-bold">Memo:</span>
					<input
						onChange={(e) =>
							dispatch(
								updateInput({
									name: e.target.name,
									value: e.target.value,
								})
							)
						}
						name="memo"
						placeholder="Entry Memo"
						value={entry.memo}
						className="w-64 h-8"
					/>
				</div>
			</div>
		</>
	);
};

export default EntryHeader;
