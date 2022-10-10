export function newEntry() {
	return {
		type: 'NEW_ENTRY',
	};
}

export function deleteEntry(id) {
	return {
		type: 'DELETE_ENTRY',
		payload: id,
	};
}

export function editEntry(id) {
	return {
		type: 'EDIT_ENTRY',
		payload: id,
	};
}
