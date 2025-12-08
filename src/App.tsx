import './index.css'
import { Route, Routes } from 'react-router-dom'
import { TablesMakerPage } from './Pages/TablesMakerPage'
import NavigationComp from './components/NavigationComp'
import ProfilePage from './Pages/ProfilePage'
import HomePage from './Pages/HomePage'


function App() {
  return (
    <>
      <NavigationComp />
      <Routes>
        <Route path="/" element={<TablesMakerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/home' element={<HomePage />} />
        
      </Routes>
    </>

  )
}

export default App
