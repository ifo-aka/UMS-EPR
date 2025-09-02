import Header from './component/Header'
import Sidebar from "./pages/Sidebar"
import Footer from './component/Footer'
import MainAndHeader from './component/MainAndHeader'

import { Outlet } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import MasterContainer from './component/MasterContainer'

function App() {


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
