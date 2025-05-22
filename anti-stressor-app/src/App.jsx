import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CodingJokes from '../pages/coding/coding-jokes'
import GamingJokes from '../pages/gaming/gaming-jokes'
import MusicJokes from '../pages/music/music-jokes'
// Import your other pages as needed

// Simple SVG icons (no extra packages needed)
const CodingIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <path stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
  </svg>
)
const GamingIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <rect x="2" y="6" width="20" height="12" rx="6" stroke="#4caf50" strokeWidth="2"/>
    <circle cx="8" cy="12" r="1" fill="#4caf50"/>
    <circle cx="16" cy="12" r="1" fill="#4caf50"/>
    <path stroke="#4caf50" strokeWidth="2" d="M12 15v2"/>
  </svg>
)
const MusicIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <path stroke="#e91e63" strokeWidth="2" d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3" stroke="#e91e63" strokeWidth="2"/>
    <circle cx="18" cy="16" r="3" stroke="#e91e63" strokeWidth="2"/>
  </svg>
)

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
      <main className="center-content">
        <section className="text-center w-full max-w-xl mx-auto">
          <p className="text-base sm:text-lg mb-6 text-white">What is your hobby?</p>
          <div className="button-group">
            <Link to="/coding">
              <button>
                <CodingIcon />
                CODING
              </button>
            </Link>
            <Link to="/gaming">
              <button>
                <GamingIcon />
                GAMING
              </button>
            </Link>
            <Link to="/music">
              <button>
                <MusicIcon />
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