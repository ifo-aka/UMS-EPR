import { StrictMode, use } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

// Context
 import AppContextProvider from './store/AppContextProvider.jsx';
import { AppContext } from './store/AppContext.jsx';
import store from "./store"

// Pages/Components
import App from './App.jsx';
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx';

// import Main from './component/Main.jsx';
import ProtectedRoutes from './component/ProtectedRoutes.jsx';
import { useContext } from 'react';
import SignUp from './component/SiginUp.jsx';
import AddStudentFrom from './component/AddStudentFrom.jsx';
import StudentDetailPage from './component/StudentDetailPage.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';
import { Provider } from 'react-redux';
import {useSelector , useDispatch } from 'react-redux';

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

// Fix nested route paths and casing
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },

 
      {
        path: 'addStudentForm',
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
        )
      },
      {
        path: 'studentDetail',
        element: (
          <ProtectedRoutes isAuthenticated={isAuthenticated}>
            <StudentDetailPage />
          </ProtectedRoutes>
        )
      }
    ,

    ]
  },
  {
    path: "/about",
    element: <About />
  },
      {
      path : "*",
      element : <NotFound />
    }
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
