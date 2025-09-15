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
import PersonalProfile from './component/PersonalProfile.jsx';

// Layout
import App from './App.jsx';

// Pages
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';

import SignUp from './component/SiginUp.jsx';
import AddStudentFrom from './component/AddStudentFrom.jsx';
import StudentDetailPage from './component/StudentDetailPage.jsx';
import FileUploadPage from './pages/FileUpload.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';

// Auth
import ProtectedRoutes from './component/ProtectedRoutes.jsx';
import DashBoardPage from './pages/Dashboard.jsx';
import HomePage from './pages/Home.jsx';

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />, // Layout with Sidebar + Header + Outlet
      children: [
        { index: true, element: <HomePage /> }, // this is "/"
        
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
              <DashBoardPage />
            </ProtectedRoutes>
          ),
        },
        { path: 'studentDetail', element: <StudentDetailPage /> },
        { path: 'fileUpload', element: <FileUploadPage /> },
        {path: "personalProfile",element : <PersonalProfile />},
        {path: "profile", element :(
          <ProtectedRoutes isAuthenticated={isAuthenticated}>

           <PersonalProfile />
           </ProtectedRoutes>
        )
          },
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
