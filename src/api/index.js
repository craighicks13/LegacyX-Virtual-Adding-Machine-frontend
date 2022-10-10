import axios from 'axios';

//TODO: Log in user
export async function logInUser(user, password) {
	//Log in user
}

//TODO: Log out user
export async function logOutUser() {
	// Log out user
}

//TODO: Pull entries for logged in user
export async function loadAll(user = '') {
	const response = await axios.get(`/api/journals`);
	return response.data;
}

export async function createJournalEntry() {
	const response = await axios.put(`/api/journal/new`);
	return response.data;
}

export async function deleteJournalEntry(id) {
	const response = await axios.put(`/api/journal/${id}/delete`);
	return response.data;
}

export async function loadEntry(id) {
	const response = await axios.get(`/api/journal/${id}/`);
	return response.data;
}

export async function saveEntry(id, entry) {
	const response = await axios.post(`/api/journal/${id}/save`, {
		entry: entry,
	});
	return response.data;
}
