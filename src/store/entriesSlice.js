import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteJournalEntry, loadAll } from '../api';

const entriesSlice = createSlice({
	name: 'journal',
	initialState: {
		data: [],
		status: '',
		message: '',
	},
	reducers: {
		deleteEntry: (state, action) => {
			const indexOfId = state.data.indexOf(action.payload);
			state.data.splice(indexOfId, 1);
		},
		clearEntries: (state) => {
			state.data = [];
			state.status = '';
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllEntries.fulfilled, (state, { payload }) => {
				state.data = payload;
				state.status = 'success';
				state.message = '';
			})
			.addCase(fetchAllEntries.pending, (state) => {
				state.status = 'loading';
				state.message = 'Loading entries';
			})
			.addCase(fetchAllEntries.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(deleteEntry.fulfilled, (state, { payload }) => {
				state.data = payload;
				state.status = 'success';
			})
			.addCase(deleteEntry.pending, (state) => {
				state.status = 'loading';
				state.message = 'Deleting entry';
			})
			.addCase(deleteEntry.rejected, (state) => {
				state.status = 'error';
				state.message = 'There was an issue deleting the entry';
			});
	},
});

export const deleteEntry = createAsyncThunk(
	'delete-entry',
	async ({ uid, num }) => {
		const response = await deleteJournalEntry(uid, num);
		return response;
	}
);

export const fetchAllEntries = createAsyncThunk(
	'fetch-all-entries',
	async (userId, { abortController }) => {
		const response = await loadAll(userId, abortController);
		return response;
	}
);

export const { clearEntries } = entriesSlice.actions;

export default entriesSlice;
