import { Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Merge from './pages/Merge'
import Split from './pages/Split'
import Extract from './pages/Extract'
import Rotate from './pages/Rotate'
import PdfToJpg from './pages/PdfToJpg'
import JpgToPdf from './pages/JpgToPdf'
import PdfToExcel from './pages/PdfToExcel'
import PdfToWord from './pages/PdfToWord'
import Compress from './pages/Compress'

const tools = [
  { path: '/', label: 'Anasayfa', icon: '🏠' },
  { path: '/merge', label: 'Birleştir', icon: '📄' },
  { path: '/split', label: 'Böl', icon: '✂️' },
  { path: '/extract', label: 'Çıkar', icon: '📋' },
  { path: '/rotate', label: 'Döndür', icon: '🔄' },
  { path: '/pdf-to-jpg', label: 'PDF-JPG', icon: '🖼️' },
  { path: '/jpg-to-pdf', label: 'JPG-PDF', icon: '📷' },
  { path: '/pdf-to-excel', label: 'Excel', icon: '📊' },
  { path: '/pdf-to-word', label: 'Word', icon: '📝' },
  { path: '/compress', label: 'Sıkıştır', icon: '📉' },
]

function App() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500)
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#lg)" />
              <path d="M9 8h9l6 6v10a1 1 0 01-1 1H9a1 1 0 01-1-1V9a1 1 0 011-1z" fill="white" fillOpacity=".9" />
              <path d="M18 8l6 6h-5a1 1 0 01-1-1V8z" fill="white" fillOpacity=".5" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c3aed" />
                  <stop offset="1" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>
            <span>PDF<strong>Edit</strong></span>
          </NavLink>
          <div className="badge">🔒 100% Yerel & Gizli</div>
        </div>
      </header>

      <nav className="nav-links">
        {tools.slice(1).map(tool => (
          <NavLink 
            key={tool.path} 
            to={tool.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={tool.path === '/'}
          >
            <span>{tool.icon}</span>
            <span>{tool.label}</span>
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/merge" element={<Merge showToast={showToast} />} />
        <Route path="/split" element={<Split showToast={showToast} />} />
        <Route path="/extract" element={<Extract showToast={showToast} />} />
        <Route path="/rotate" element={<Rotate showToast={showToast} />} />
        <Route path="/pdf-to-jpg" element={<PdfToJpg showToast={showToast} />} />
        <Route path="/jpg-to-pdf" element={<JpgToPdf showToast={showToast} />} />
        <Route path="/pdf-to-excel" element={<PdfToExcel showToast={showToast} />} />
        <Route path="/pdf-to-word" element={<PdfToWord showToast={showToast} />} />
        <Route path="/compress" element={<Compress showToast={showToast} />} />
      </Routes>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <ul className="mobile-nav-items">
          {tools.map(tool => (
            <li key={tool.path}>
              <NavLink 
                to={tool.path} 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                end={tool.path === '/'}
              >
                <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                <span>{tool.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
        {toast.message}
      </div>

      <footer className="footer">
        <p>PDFEdit tamamen bilgisayarınızda çalışır. Dosyalarınız hiçbir yere yüklenmez.</p>
      </footer>
    </>
  )
}

export default App