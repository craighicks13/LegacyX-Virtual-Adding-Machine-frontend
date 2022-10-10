import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useEntry } from '../context/EntryProvider';

const LineItem = ({ line, item }) => {
	const { deleteLineItem, updateItemProperty } = useEntry();

	const [id] = useState(item.id);
	const [account, setAccount] = useState(item.account || '');
	const [debits, setDebits] = useState(item.debits || 0);
	const [credits, setCredits] = useState(item.credits || 0);
	const [description, setDescription] = useState(
		item.description || ''
	);
	const [name, setName] = useState(item.name || '');
	const [tax, setTax] = useState(item.sales_tax || 0);

	return (
		<div className="grid grid-flow-col auto-cols-max mt-2 gap-1 place-items-center">
			<div className="w-5 text-xs text-neutral-700">{line}</div>
			<div>
				<input
					onChange={(e) => setAccount(e.target.value)}
					value={account}
					className="w-64 h-8"
					onBlur={(e) => updateItemProperty(id, 'account', account)}
				/>
			</div>
			<div>
				<input
					onChange={(e) => setDebits(e.target.value)}
					value={debits}
					className="w-20 text-right h-8"
					onBlur={(e) => updateItemProperty(id, 'debits', debits)}
				/>
			</div>
			<div>
				<input
					onChange={(e) => setCredits(e.target.value)}
					value={credits}
					className="w-20 text-right h-8"
					onBlur={(e) => updateItemProperty(id, 'credits', credits)}
				/>
			</div>
			<div>
				<input
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					className="w-64 h-8"
					onBlur={(e) =>
						updateItemProperty(id, 'description', description)
					}
				/>
			</div>
			<div>
				<input
					onChange={(e) => setName(e.target.value)}
					value={name}
					className="w-40 h-8"
					onBlur={(e) => updateItemProperty(id, 'name', name)}
				/>
			</div>
			<div>
				<input
					onChange={(e) => setTax(e.target.value)}
					value={tax}
					className="w-12 text-right h-8"
					onBlur={(e) => updateItemProperty(id, 'sales_tax', credits)}
				/>
			</div>
			<button onClick={() => deleteLineItem(id)} className="btn">
				<AiFillDelete />
			</button>
		</div>
	);
};

export default LineItem;
