import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntriesList from './components/EntriesList';
import EditEntry from './components/EditEntry';
import MainHeader from './components/headers/MainHeader';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <div className="text-textmain mx-auto min-h-screen max-w-5xl font-normal">
        <MainHeader />
        <div className="mx-auto flex px-2 pt-2 sm:px-5 md:gap-x-10 md:pt-10">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/entries" element={<EntriesList />} />
              <Route path="/entry/:entryNum" element={<EditEntry />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
