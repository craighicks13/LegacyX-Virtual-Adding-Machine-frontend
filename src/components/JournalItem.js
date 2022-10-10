import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useEntryList } from '../context/JournalsProvider';

const JournalItem = ({ number, date, memo }) => {
	const { deleteEntry } = useEntryList();

	return (
		<div className="flex justify-between gap-x-5 mb-1 px-5 py-2 text-xs bg-neutral-200 border-b-1 border-b-neutral-400 w-full rounded">
			<div className="flex gap-5 md:gap-10 items-center ">
				<Link
					className="article-list-w-12 bg-neutral-400 hover:bg-neutral-700 hover:text-white text-neutral-900 font-bold py-2 px-4 rounded inline-flex items-center"
					to={`/entry/${number}`}
				>
					<AiFillEdit />
				</Link>
				<div>Entry No. {number}</div>
				<div className="text-neutral-700">{date}</div>
				<div className="text-neutral-900 italic">{memo}</div>
			</div>
			<div className="">
				<button
					onClick={() => deleteEntry(number)}
					className="article-list-w-12 bg-neutral-400 hover:bg-neutral-700 hover:text-white text-neutral-900 font-bold py-2 px-4 rounded inline-flex items-center"
				>
					<AiFillDelete />
				</button>
			</div>
		</div>
	);
};

export default JournalItem;
