import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CodingJokes from '../pages/coding/coding-jokes'
import GamingJokes from '../pages/gaming/gaming-jokes'
import MusicJokes from '../pages/music/music-jokes'

// Import your other pages as needed

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#242424]">
      {/* Header always at the very top */}
      <header className="w-full pt-4 pb-2 bg-transparent flex-shrink-0">
        <h1 className="mx-auto max-w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center whitespace-nowrap overflow-x-auto text-white">
          ANTI-STRESSOR
        </h1>
      </header>
      {/* Center the question and buttons vertically */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-0">
        <section className="text-center w-full max-w-xl mx-auto">
          <p className="text-base sm:text-lg mb-6 text-white">What is your hobby?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full">
            <Link to="/coding" className="flex-1">
              <button className="w-full rounded-lg border border-transparent px-6 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline focus:outline-4 focus:outline-blue-400">
                CODING
              </button>
            </Link>
            <Link to="/gaming" className="flex-1">
              <button className="w-full rounded-lg border border-transparent px-6 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline focus:outline-4 focus:outline-blue-400">
                GAMING
              </button>
            </Link>
            <Link to="/music" className="flex-1">
              <button className="w-full rounded-lg border border-transparent px-6 py-2 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline focus:outline-4 focus:outline-blue-400">
                MUSIC
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coding" element={<CodingJokes />} />
        <Route path="/gaming" element={<GamingJokes />} />
        <Route path="/music" element={<MusicJokes />} />
      </Routes>
    </Router>
  )
}

export default App