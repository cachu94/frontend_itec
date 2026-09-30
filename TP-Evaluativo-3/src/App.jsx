import './App.css'
import { FavoritosProvider } from './context/FavoritosContext'
import { Navbar } from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Teamslayout } from './pages/TeamsLayout'
import { TeamList } from './pages/TeamsList'
import { TeamDetail } from './pages/TeamsDetail'
import { TeamOverview } from './components/TeamOverview'
import { TeamDrivers } from './components/TeamDrivers'
import { Favorites } from './pages/Favorites'
import { NotFound } from './pages/NotFond'


function App() {
  return (
    <FavoritosProvider>
      <div>
        <Navbar />

        <main>
          <Routes>
            <Route path='/' element={<Navigate to="/home" replace />} />

            <Route path='/home' element={<Home />}/>

            <Route path='/equipos' element={<Teamslayout />}>
              <Route index element={<TeamList />} />

              <Route path=':id' element={<TeamDetail />}>
                <Route index element={<TeamOverview />} />
                <Route path='pilotos' element={<TeamDrivers />}/>
              </Route>
            </Route>

              <Route path='/favoritos' element={<Favorites />}/>

              <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </FavoritosProvider>
  )
}

export default App
