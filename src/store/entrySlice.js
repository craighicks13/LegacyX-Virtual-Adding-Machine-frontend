import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { loadEntry, saveEntry } from '../api';
import { v4 as uuid } from 'uuid';

const initialLineItem = {
	id: uuid(),
	account: '',
	debits: 0,
	credits: 0,
	description: '',
	name: '',
	sales_tax: 0,
};

const entryInitialState = {
	lineItems: [initialLineItem],
	status: '',
	message: '',
	memo: '',
	entry_num: 'new',
	date: new Date().toLocaleDateString('en-GB').split('/').join('-'),
	active: true,
	debitsTotal: 0,
	creditsTotal: 0,
};

const getTotal = ({ lineItems, category }) => {
	if (lineItems === null) return 0;
	const total = lineItems.reduce((t, line) => {
		return parseInt(t) + (parseInt(line[category]) || 0);
	}, 0);
	return total;
};

const entrySlice = createSlice({
	name: 'entry',
	initialState: { ...entryInitialState },
	reducers: {
		getEntry: (state, action) => {
			state.data = action.payload;
		},
		updateInput: (state, action) => {
			if (action.payload.lineId !== undefined) {
				const lineItem = state.lineItems.at(action.payload.lineId);
				lineItem[action.payload.name] = action.payload.value;
				if (action.payload.name === 'credits')
					state.creditsTotal = getTotal({
						lineItems: state.lineItems,
						category: 'credits',
					});
				if (action.payload.name === 'debits')
					state.debitsTotal = getTotal({
						lineItems: state.lineItems,
						category: 'debits',
					});
			} else {
				state[action.payload.name] = action.payload.value;
			}
			state.status = '';
			state.message = '';
		},
		newLineItem: (state, action) => {
			let newLineItem = { ...initialLineItem, id: action.payload };
			state.lineItems = [...state.lineItems, newLineItem];
		},
		deleteLineItem: (state, action) => {
			let updatedList = state.lineItems.filter(
				(line) => line.id !== action.payload
			);
			state.lineItems = updatedList;
			state.creditsTotal = getTotal({
				lineItems: state.lineItems,
				category: 'credits',
			});
			state.debitsTotal = getTotal({
				lineItems: state.lineItems,
				category: 'debits',
			});
		},
		clearAllLines: (state) => {
			state.lineItems = [initialLineItem];
		},
		clearJournalEntry: (state) => {
			state.lineItems = entryInitialState.lineItems;
			state.entry_num = entryInitialState.entry_num;
			state.memo = entryInitialState.memo;
			state.date = entryInitialState.date;
			state.message = entryInitialState.message;
			state.status = 'cancelled';
			state.creditsTotal = 0;
			state.debitsTotal = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEntry.fulfilled, (state, { payload }) => {
				state.lineItems = payload.lineItems || [];
				state.entry_num = payload.entry_num;
				state.memo = payload.memo;
				state.date = payload.date;
				state.active = payload.active;
				state.status = 'success';
				state.message = '';
				state.creditsTotal = getTotal({
					lineItems: state.lineItems,
					category: 'credits',
				});
				state.debitsTotal = getTotal({
					lineItems: state.lineItems,
					category: 'debits',
				});
			})
			.addCase(fetchEntry.pending, (state) => {
				state.status = 'loading';
				state.message = 'Loading entry';
			})
			.addCase(fetchEntry.rejected, (state) => {
				state.status = 'error';
				state.message = 'There was an error loading the entry';
			})
			.addCase(submitSaveEntry.pending, (state) => {
				state.status = 'saving';
			})
			.addCase(submitSaveEntry.rejected, (state, { payload }) => {
				state.status = 'error';
				state.message = 'There was an error saving';
			})
			.addCase(submitSaveEntry.fulfilled, (state, { payload }) => {
				state.status = 'saved';
				state.message = 'Entry was saved!';
				if (payload.new_id) state.entry_num = payload.new_id;
			});
	},
});

export const fetchEntry = createAsyncThunk(
	'fetch-entry-by-id',
	async ({ id, abortController }) => {
		const response = await loadEntry(id, abortController);
		return response;
	}
);

export const submitSaveEntry = createAsyncThunk(
	'save-entry',
	async ({ uid, entry }) => {
		let submitData = JSON.stringify(entry);
		const response = await saveEntry(
			uid,
			entry.entry_num,
			submitData
		);
		return response;
	}
);

export const {
	getEntry,
	updateInput,
	newLineItem,
	deleteLineItem,
	clearAllLines,
	getJournalNumber,
	clearJournalEntry,
} = entrySlice.actions;

export default entrySlice;
