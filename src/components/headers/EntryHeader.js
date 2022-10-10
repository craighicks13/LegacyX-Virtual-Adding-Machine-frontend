import { useEntry } from '../../context/EntryProvider';
import { AiFillCloseCircle } from 'react-icons/ai';

const EntryHeader = () => {
	const { entry, cancelEditEntry, message } = useEntry();

	return (
		<>
			{message && (
				<div className="bg-red-400 p-5 mb-10 rounded text-white">
					{message}
				</div>
			)}
			<div className="grid grid-cols-3 items-baseline">
				<div className="text-xs font-bold">
					Jounal date:
					<span className="font-normal"> {entry?.date}</span>
				</div>
				<div className="font-bold text-lg justify-self-center">
					Jounal no. {entry?.id}
				</div>
				<div className="justify-self-end">
					<button className="btn" onClick={() => cancelEditEntry()}>
						<AiFillCloseCircle />
					</button>
				</div>
			</div>
		</>
	);
};

export default EntryHeader;
