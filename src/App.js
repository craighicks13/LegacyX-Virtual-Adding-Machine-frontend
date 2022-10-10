import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JournalItemsList from './app/JournalItemsList';
import EditEntry from './app/EditEntry';
import { EntryProvider } from './context/EntryProvider';
import { JournalsProvider } from './context/JournalsProvider';
import MainHeader from './components/headers/MainHeader';

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen font-normal text-textmain mx-auto max-w-5xl">
				<MainHeader />
				<div className="flex md:gap-x-10 px-5 pt-2 md:pt-10 mx-auto">
					<div className="w-full">
						<Routes>
							<Route
								path="/"
								element={
									<JournalsProvider>
										<JournalItemsList />
									</JournalsProvider>
								}
							/>
							<Route
								path="/entry/:entryId"
								element={
									<EntryProvider>
										<EditEntry />
									</EntryProvider>
								}
							/>
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
