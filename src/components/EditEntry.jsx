import EntryHeader from './headers/EntryHeader';
import { RiDeleteBin7Line as DeleteButton } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
	fetchEntry,
	updateInput,
	newLineItem,
	clearAllLines,
	submitSaveEntry,
	deleteLineItem,
	clearJournalEntry,
} from '../store/entrySlice';

const EditEntry = () => {
	const [closeOnSave, setCloseOnSave] = useState(false);
	const { entryNum } = useParams();
	const state = useSelector((state) => state);
	const { entry, user } = state;
	const debitsTotal = entry.debitsTotal;
	const creditsTotal = entry.creditsTotal;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || !user.uid) {
			navigate('/');
			return;
		}

		if (entryNum !== 'new') {
			const controller = new AbortController();
			dispatch(
				fetchEntry({
					id: entryNum,
					abortController: controller.signal,
				})
			);
			return () => controller.abort();
		}
	}, [entryNum, dispatch, user, navigate]);

	useEffect(() => {
		if (entry.status !== 'saved') return;
		if (closeOnSave) {
			dispatch(clearJournalEntry());
			navigate('/entries');
		}
	}, [entry, navigate, closeOnSave, dispatch]);

	const createLabel = (label) => {
		return (
			<div className="text-xs font-bold mb-2 pl-1 uppercase">
				{label}
			</div>
		);
	};

	const createNewLineItem = () => {
		const uid = uuid();
		dispatch(newLineItem(uid));
	};

	return (
		<div className="">
			{entry && (
				<>
					<EntryHeader />
					<div className="mt-10">
						{entry.lineItems.map((item, index, list) => {
							return (
								<div
									key={item.id}
									id={index}
									className="sm:flex mt-2 gap-1"
								>
									<div className="flex gap-1 w-full">
										<div className="text-xs text-neutral-700">
											{!index && createLabel('#')}
											<span className="w-3 block pl-0.5 pt-2">
												{index + 1}
											</span>
										</div>
										<div className="w-full">
											{!index && createLabel('Account')}
											<div className="">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													name="account"
													id={index}
													value={item.account}
												/>
											</div>
											{index === list.length - 1 && (
												<div className="text-xs text-right mt-3 pr-2 font-bold uppercase bg-neutral-200  py-2 rounded-l-md">
													Totals
												</div>
											)}
										</div>
										<div>
											{!index && createLabel('Debit')}
											<div className="w-12 sm:w-16">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													type="number"
													value={item.debits ? item.debits : ''}
													name="debits"
													id={index}
													className="text-right"
												/>
											</div>

											{index === list.length - 1 && (
												<div
													className={`text-xs text-right mt-3 -ml-1 pr-2 bg-neutral-200 py-2 font-bold ${
														debitsTotal !== creditsTotal &&
														'text-red-500'
													}`}
												>
													{debitsTotal}
												</div>
											)}
										</div>
										<div>
											{!index && createLabel('credit')}
											<div className="w-12 sm:w-16">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													type="number"
													name="credits"
													value={item.credits ? item.credits : ''}
													id={index}
													className="text-right"
												/>
											</div>
											{index === list.length - 1 && (
												<div
													className={`text-xs text-right mt-3 -ml-1 pr-2 bg-neutral-200 py-2 rounded-r-md font-bold ${
														debitsTotal !== creditsTotal &&
														'text-red-500'
													}`}
												>
													{creditsTotal}
												</div>
											)}
										</div>
									</div>
									<div className="hidden sm:flex gap-1 max-w-md">
										<div>
											{!index && createLabel('Description')}
											<div className="w-44">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													name="description"
													id={index}
													value={item.description}
													className=""
												/>
											</div>
										</div>
										<div>
											{!index && createLabel('Name')}
											<div className="w-24">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													name="name"
													id={index}
													value={item.name}
													className=""
												/>
											</div>
										</div>
										<div className="">
											{!index && createLabel('Tax')}
											<div className="w-12">
												<input
													onChange={(e) =>
														dispatch(
															updateInput({
																name: e.target.name,
																value: e.target.value,
																lineId: e.target.id,
															})
														)
													}
													type="number"
													value={item.sales_tax ? item.sales_tax : ''}
													name="sales_tax"
													id={index}
													className="text-right"
												/>
											</div>
										</div>
										<div className={`h-8 ${!index && 'mt-6'}`}>
											<button
												onClick={() =>
													dispatch(deleteLineItem(item.id))
												}
												className="icon-button"
											>
												<DeleteButton />
											</button>
										</div>
									</div>
								</div>
							);
						})}
						<div className="flex flex-col gap-5 sm:flex-row justify-between sm:h-10 my-10">
							<div className="flex flex-row justify-between sm:gap-10 h-14 sm:h-10">
								<button
									className="btn w-36"
									onClick={() => createNewLineItem()}
								>
									add line
								</button>
								<button
									className="btn w-36"
									onClick={() => dispatch(clearAllLines())}
								>
									clear all lines
								</button>
							</div>
							{entry.status === 'saving' ? (
								<span className="btn">Saving</span>
							) : (
								<div className="flex flex-col gap-2 sm:flex-row ">
									<button
										className="btn bg-green-400 h-14 sm:h-10"
										onClick={() =>
											dispatch(
												submitSaveEntry({ uid: user.uid, entry })
											)
										}
									>
										Save
									</button>
									<button
										className="btn bg-green-400 h-14 sm:h-10"
										onClick={() => {
											setCloseOnSave(true);
											dispatch(
												submitSaveEntry({ uid: user.uid, entry })
											);
										}}
									>
										Save & Close
									</button>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default EditEntry;
