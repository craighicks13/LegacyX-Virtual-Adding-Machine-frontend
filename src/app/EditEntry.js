import { useEntry } from '../context/EntryProvider';
import LineItem from '../components/LineItem';
import EntryHeader from '../components/headers/EntryHeader';
import Totals from '../components/Totals';
import { useEffect, useState } from 'react';

const EditEntry = ({ id }) => {
	const {
		memo,
		lineItems,
		newLineItem,
		clearAllLines,
		submitEntry,
		updateMemo,
	} = useEntry();
	const [memoUpdate, setMemoUpdate] = useState('');

	useEffect(() => {
		setMemoUpdate(memo);
		return () => {};
	}, [memo]);

	return (
		<div className="">
			<EntryHeader />
			<div className="flex gap-5 place-items-center mt-10 text-xs">
				<span className="font-bold">Memo:</span>
				<input
					onChange={(e) => setMemoUpdate(e.target.value)}
					value={memoUpdate}
					className="w-64 h-8"
					onBlur={(e) => updateMemo(memoUpdate)}
				/>
			</div>
			<div className="grid grid-flow-col auto-cols-max gap-1 mt-10 text-xs font-bold">
				<div className="w-5 justify-center">#</div>
				<div className="w-64 pl-1">ACCOUNT</div>
				<div className="w-20 pl-1">DEBIT</div>
				<div className="w-20 pl-1">CREDIT</div>
				<div className="w-64 pl-1">DESCRIPTION</div>
				<div className="w-40 pl-1">NAME</div>
				<div className="w-16 pl-1">TAX</div>
			</div>
			{lineItems?.map((item, index) => {
				return (
					<LineItem key={item.id} line={index + 1} item={item} />
				);
			})}
			<Totals />
			<div className="flex justify-between h-10 my-10">
				<div className="flex gap-10">
					<button className="btn" onClick={() => newLineItem()}>
						add lines
					</button>
					<button className="btn" onClick={() => clearAllLines()}>
						clear all lines
					</button>
				</div>
				<button
					className="btn bg-green-400"
					onClick={() => submitEntry()}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditEntry;
