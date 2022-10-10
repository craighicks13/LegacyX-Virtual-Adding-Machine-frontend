import {
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// export interface LineItem {
//     id: Number;
//     account: String;
//     debits: Number;
//     credits: Number;
//     description: String;
//     name: String;
//     sales_tax: Number;
//     active: Boolean;
// }

export const lineItemApi = createApi({
	reducerPath: 'lineItemApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
	tagTypes: ['LineItems'],
	endpoints: (builder) => ({
		getAll: builder.query({
			query: () => `lineItems`,
			providesTags: [{ type: 'LineItems', id: 'Entry' }],
		}),
	}),
});
