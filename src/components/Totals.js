import { useEffect, useState } from 'react';
import { useEntry } from '../context/EntryProvider';

const Totals = () => {
	const { lineItems } = useEntry();
	const [debitsTotal, setDebitsTotal] = useState(0);
	const [creditsTotal, setCebitsTotal] = useState(0);

	useEffect(() => {
		setDebitsTotal(
			lineItems?.reduce(
				(total, obj) => parseInt(obj.debits) + total,
				0
			)
		);
		setCebitsTotal(
			lineItems?.reduce(
				(total, obj) => parseInt(obj.credits) + total,
				0
			)
		);
	}, [lineItems]);

	return (
		<div
			className={`grid grid-flow-col auto-cols-max gap-1 mt-10 text-xs bg-neutral-200 py-2 rounded-lg ${
				debitsTotal !== creditsTotal && 'text-red-500'
			}`}
		>
			<div className="w-5"></div>
			<div className="w-64 flex justify-end font-bold pr-2">
				Totals
			</div>
			<div className={`w-20 flex justify-end`}>{debitsTotal}</div>
			<div className={`w-20 flex justify-end`}>{creditsTotal}</div>
			<div className="w-64"></div>
			<div className="w-40"></div>
			<div className="w-16"></div>
		</div>
	);
};

export default Totals;
