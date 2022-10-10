import {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadEntry, saveEntry } from '../api';

const EntryContext = createContext();

export function useEntry() {
	return useContext(EntryContext);
}

export function EntryProvider({ children }) {
	const { entryId } = useParams();
	const [entry, setEntry] = useState();
	const [memo, setMemo] = useState('');
	const [lineItems, setLineItems] = useState();
	const [loadFromLocalStorage, setLoadFromLocalStorage] =
		useState(true);
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (loadFromLocalStorage) {
			if (localStorage.getItem('entry') === null) {
				setLoadFromLocalStorage(false);
				return;
			}
			const data = JSON.parse(localStorage.getItem('entry'));
			if (data.id === parseInt(entryId)) {
				setEntry(data);
				setMemo(data.memo);
				setLineItems(data.lineItems);
				setMessage(
					'Loaded unsaved data! Make sure to save to prevent from losing data.'
				);
			} else {
				setLoadFromLocalStorage(false);
				return;
			}
		} else {
			(async () => {
				const entry = await loadEntry(entryId);
				setEntry(entry);
				setMemo(entry.memo);

				if (!entry.lineItems.length) {
					clearAllLines();
				} else {
					setLineItems(entry.lineItems);
				}
			})();
		}
	}, [entryId, loadFromLocalStorage]);

	// TODO: Add warning about losing changes on close
	function cancelEditEntry() {
		localStorage.clear();
		navigate('/');
	}

	function updateMemo(value) {
		entry.memo = value;
		console.log(entry);
	}

	function updateEntry() {
		entry.lineItems = lineItems;
		localStorage.setItem('entry', JSON.stringify(entry));
	}

	async function submitEntry() {
		entry.lineItems = lineItems;
		const result = await saveEntry(entry.id, JSON.stringify(entry));
		if (result === 'success') {
			setMessage('');
			localStorage.clear();
			navigate('/');
		} else {
			setMessage('There was an error saving.');
		}
	}

	function newLineItem() {
		setLineItems([
			...lineItems,
			{
				id: Date.now(),
				account: '',
				debits: 0,
				credits: 0,
				description: '',
				name: '',
				sales_tax: 0,
			},
		]);
	}

	function clearAllLines() {
		setLineItems([
			{
				id: Date.now(),
				account: '',
				debits: 0,
				credits: 0,
				description: '',
				name: '',
				sales_tax: 0,
			},
		]);
	}

	function updateItemProperty(id, item, value) {
		const updatedLineItems = lineItems.map((line) => {
			if (line.id === id) line[item] = value;
			return line;
		});

		setLineItems(updatedLineItems);
		updateEntry();
	}
	function deleteLineItem(id) {
		setLineItems(lineItems.filter((item) => item.id !== id));
	}

	return (
		<EntryContext.Provider
			value={{
				entry,
				lineItems,
				memo,
				message,
				submitEntry,
				newLineItem,
				deleteLineItem,
				updateItemProperty,
				clearAllLines,
				cancelEditEntry,
				updateMemo,
			}}
		>
			{children}
		</EntryContext.Provider>
	);
}
