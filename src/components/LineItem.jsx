import { useReducer } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useEntry } from '../context/EntryProvider';
import { ACTIONS_TYPE } from '../store/actions';
import { entryReducer } from '../store/reducers';

const LineItem = ({ line, item }) => {
	const { deleteLineItem } = useEntry();
	const [state, dispatch] = useReducer(entryReducer, item);

	const handleChange = (e) => {
		dispatch({
			type: ACTIONS_TYPE.UPDATE_INPUT,
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	return (
		<div className="grid grid-flow-col auto-cols-max mt-2 gap-1 place-items-center">
			<div className="w-5 text-xs text-neutral-700">{line}</div>
			<div>
				<input
					onChange={handleChange}
					name="account"
					value={state.account}
					className="w-64 h-8"
				/>
			</div>
			<div>
				<input
					onChange={handleChange}
					value={state.debits}
					name="debits"
					className="w-20 text-right h-8"
				/>
			</div>
			<div>
				<input
					onChange={handleChange}
					name="credits"
					value={state.credits}
					className="w-20 text-right h-8"
				/>
			</div>
			<div>
				<input
					onChange={handleChange}
					name="description"
					value={state.description}
					className="w-64 h-8"
				/>
			</div>
			<div>
				<input
					onChange={handleChange}
					name="name"
					value={state.name}
					className="w-40 h-8"
				/>
			</div>
			<div>
				<input
					onChange={handleChange}
					value={state.sales_tax}
					name="sales_tax"
					className="w-12 text-right h-8"
				/>
			</div>
			<button
				onClick={() => deleteLineItem(state.id)}
				className="btn"
			>
				<AiFillDelete />
			</button>
		</div>
	);
};

export default LineItem;
