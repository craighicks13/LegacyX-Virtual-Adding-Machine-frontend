import JournalItem from '../components/JournalItem';
import { useEntryList } from '../context/JournalsProvider';

const Entries = ({ cb_edit, cb_delete }) => {
	const { journals, createNewEntry } = useEntryList();

	return (
		<>
			<div className="">
				<button className="btn" onClick={() => createNewEntry()}>
					New Entry
				</button>
			</div>
			<div className="my-10 p-10 bg-neutral-400 rounded">
				{journals.map((data, id) => {
					return data.active ? (
						<JournalItem
							key={id}
							number={data.id}
							date={data.date}
							memo={data.memo}
						/>
					) : null;
				})}
			</div>
		</>
	);
};

export default Entries;
