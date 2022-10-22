import axios from 'axios';

export async function loadAll(uid, abortController) {
	const response = await axios.get(`/api/journals/${uid}`, {
		signal: abortController,
	});
	return response.data;
}

export async function createJournalEntry() {
	const response = await axios.put(`/api/journal/new`);
	return response.data;
}

export async function deleteJournalEntry(uid, id) {
	const response = await axios.post(`/api/journal/${id}/delete`, {
		entry_num: id,
		uid: uid,
	});
	return response.data;
}

export async function loadEntry(id) {
	const response = await axios.get(`/api/journal/${id}/`);
	return response.data;
}

export async function saveEntry(uid, id, entry) {
	const response = await axios.post(`/api/journal/${id}/save`, {
		entry: entry,
		uid: uid,
	});
	return response.data;
}
