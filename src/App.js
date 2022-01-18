import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddUser from './components/AddUser';
import ListOfUsers from './components/ListOfUsers';
import EditUser from './components/EditUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatchPage from './components/NoMatchPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ListOfUsers />} />
				<Route path="adduser" element={<AddUser />} />
				<Route path="edituser/:ID" element={<EditUser />} />
				<Route path="*" element={<NoMatchPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
