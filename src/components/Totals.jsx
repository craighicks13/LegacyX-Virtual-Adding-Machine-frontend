import { useSelector } from 'react-redux';

const Totals = () => {
	const debitsTotal = useSelector((state) => state.entry.debitsTotal);
	const creditsTotal = useSelector(
		(state) => state.entry.creditsTotal
	);

	return (
		<div
			className={`flex gap-1 mt-5 text-xs bg-neutral-200 py-2 rounded-lg ${
				debitsTotal !== creditsTotal && 'text-red-500'
			}`}
		>
			<div className="w-full max-w-xs text-right">Totals</div>
			<div className={`w-32 sm:w-44 text-right`}>{debitsTotal}</div>
			<div className={`w-32 sm:w-44 text-right`}>{creditsTotal}</div>
			<div className="w-full"></div>
		</div>
	);
};

export default Totals;
