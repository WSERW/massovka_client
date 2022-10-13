import './App.css';
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import HomePage, { loader as authLoader } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthContext from './context/AuthContext';

import { useContext } from 'react';

function App() {
    let router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
        </Route>
    ));
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;