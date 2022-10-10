import {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	loadAll,
	createJournalEntry,
	deleteJournalEntry,
} from '../api';

const JournalItemsContext = createContext();

export function useEntryList() {
	return useContext(JournalItemsContext);
}

export function JournalsProvider({ children }) {
	const [journals, setJournalItems] = useState([]);

	useEffect(() => {
		(async () => {
			const list = await loadAll();
			setJournalItems(list);
		})();
	}, []);

	async function deleteEntry(id) {
		const updatedlist = await deleteJournalEntry(id);
		setJournalItems(updatedlist);
	}

	async function createNewEntry() {
		const updatedlist = await createJournalEntry();
		setJournalItems(updatedlist);
	}

	return (
		<JournalItemsContext.Provider
			value={{ journals, deleteEntry, createNewEntry }}
		>
			{children}
		</JournalItemsContext.Provider>
	);
}
