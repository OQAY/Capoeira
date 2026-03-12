import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MapExplorer from './components/MapExplorer'
import Dashboard from './components/Dashboard'
import DataCatalog from './components/DataCatalog'
import About from './components/About'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <MapExplorer />
      <Dashboard />
      <DataCatalog />
      <About />
    </div>
  )
}
