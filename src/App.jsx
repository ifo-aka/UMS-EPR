
import Header from './component/Header'
import Sidebar from "./pages/Sidebar"
// import Main  from './component/Main'
import Footer from './component/Footer'
import MainAndHeader from './component/MainAndHeader'
import AppContextProvider from './store/AppContextProvider'
// import Home from './component/Home'
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import MasterConatiner from './component/MasterContainer'

function App() {
   return <>

   <AppContextProvider>
      <MasterConatiner>
      <Sidebar />
  
   <MainAndHeader>
       <Header />
       <main>
         
      <Outlet />
      </main>
   </MainAndHeader>
   </MasterConatiner>
   <Footer />
  </AppContextProvider>
</>
   
}

export default App
