import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyAoISUirub_XvlmrkU5PpzOhg30rbahH5k',
	authDomain: 'simple-ledger-d49dc.firebaseapp.com',
	projectId: 'simple-ledger-d49dc',
	storageBucket: 'simple-ledger-d49dc.appspot.com',
	messagingSenderId: '281731699877',
	appId: '1:281731699877:web:eb02e8b20891e82762a94c',
	measurementId: 'G-EDH8EZ1TYE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics =
getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
