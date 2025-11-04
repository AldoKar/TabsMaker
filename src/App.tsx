import './index.css'
import { Route, Routes } from 'react-router-dom'
import { TablesMakerPage } from './Pages/TablesMakerPage'
import NavigationComp from './components/NavigationComp'
import ProfilePage from './Pages/ProfilePage'


function App() {
  return (
    <>
      <NavigationComp />
      <Routes>
        <Route path="/" element={<TablesMakerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>

  )
}

export default App
