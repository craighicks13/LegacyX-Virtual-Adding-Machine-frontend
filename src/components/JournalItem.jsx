import { Link } from 'react-router-dom';
import {
	RiDeleteBin7Line as DeleteButton,
	RiEdit2Line as EditButton,
} from 'react-icons/ri';
import { deleteEntry } from '../store/entriesSlice';
import { useDispatch, useSelector } from 'react-redux';

const JournalItem = ({ num, date, memo }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	return (
		<div className="flex justify-between gap-x-5 mb-1 px-2 py-2 h-12 text-xs bg-neutral-200 border-b-1 border-b-neutral-400 w-full rounded min-w-min">
			<div className="flex gap-5 md:gap-10 items-center ">
				<Link className="icon-button" to={`/entry/${num}`}>
					<EditButton />
				</Link>
				<div className="sm:flex sm:gap-x-5 min-w-min">
					<div className="min-w-max">Entry No. {num}</div>
					<div className="text-neutral-700 min-w-max">{date}</div>
				</div>
				<div className="text-neutral-900 italic truncate">{memo}</div>
			</div>
			<div className="">
				<button
					onClick={() =>
						dispatch(deleteEntry({ uid: user.uid, num }))
					}
					className="icon-button"
				>
					<DeleteButton />
				</button>
			</div>
		</div>
	);
};

export default JournalItem;
