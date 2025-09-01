import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import { Provider, useSelector } from 'react-redux';
import store from "./store"

// Context
import AppContextProvider from './store/AppContextProvider.jsx';

// Layout
import App from './App.jsx';

// Pages
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';
import SignUp from './component/SiginUp.jsx';
import AddStudentFrom from './component/AddStudentFrom.jsx';
import StudentDetailPage from './component/StudentDetailPage.jsx';
import FileUpload from './component/FileUpload.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';

// Auth
import ProtectedRoutes from './component/ProtectedRoutes.jsx';

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />, // Layout with Sidebar + Header + Outlet
      children: [
        { index: true, element: <Home /> }, // this is "/"
        
        { path: 'login', element: <Login /> },
    { path: 'signup', element: <SignUp /> },
        {  path: 'addStudentForm',
          element: (
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <AddStudentFrom />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },
        { path: 'studentDetail', element: <StudentDetailPage /> },
        { path: 'fileUpload', element: <FileUpload /> },
      ],
    },

    // Standalone routes (no App layout)
    
    { path: '/about', element: <About /> },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </Provider>
  </StrictMode>
);
