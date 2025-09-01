import Header from './component/Header'
import Sidebar from "./pages/Sidebar"
import Footer from './component/Footer'
import MainAndHeader from './component/MainAndHeader'
import AppContextProvider from './store/AppContextProvider'
import { Outlet, useLocation } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import MasterContainer from './component/MasterContainer'

function App() {
  const location = useLocation()

  return (
        <>
      <MasterContainer >
        <Sidebar />
        <MainAndHeader>
          <Header />
          <main >
            <Outlet  />
          </main>
        </MainAndHeader>
      </MasterContainer>
      <Footer />
      </>
   
  )
}

export default App
