import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import EncryptPdf from './pages/EncryptPdf'
import DecryptPdf from './pages/DecryptPdf'

const tools = [
  { path: '/', label: 'Anasayfa', icon: '🏠' },
  { path: '/pdf-birlestirme', label: 'Birleştir', icon: '📄' },
  { path: '/pdf-bolme', label: 'Böl', icon: '✂️' },
  { path: '/sayfa-cikar', label: 'Çıkar', icon: '📋' },
  { path: '/sayfa-dondur', label: 'Döndür', icon: '🔄' },
  { path: '/pdf-jpg-donustur', label: 'PDF-JPG', icon: '🖼️' },
  { path: '/jpg-pdf-donustur', label: 'JPG-PDF', icon: '📷' },
  { path: '/pdf-excel-donustur', label: 'Excel', icon: '📊' },
  { path: '/pdf-word-donustur', label: 'Word', icon: '📝' },
  { path: '/pdf-sikistir', label: 'Sıkıştır', icon: '📉' },
  { path: '/pdf-sifrele', label: 'Şifrele', icon: '🔒' },
  { path: '/pdf-sifre-kaldir', label: 'Şifre Kaldır', icon: '🔓' },
]

function App() {
  const location = useLocation()
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-NK753E8XJ1', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  // Backend pinger (Cold start uykusunu engellemek için)
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const pingBackend = () => fetch(`${apiUrl}/health`).catch(() => { });

    // İlk açılışta uyandır
    pingBackend();

    // Sekme açık kaldıkça her 5 dakikada bir yokla
    const intervalId = setInterval(pingBackend, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

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
          <div className="badge">🔒 100% Yerel &amp; Gizli</div>
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
        <Route path="/pdf-birlestirme" element={<Merge showToast={showToast} />} />
        <Route path="/pdf-bolme" element={<Split showToast={showToast} />} />
        <Route path="/sayfa-cikar" element={<Extract showToast={showToast} />} />
        <Route path="/sayfa-dondur" element={<Rotate showToast={showToast} />} />
        <Route path="/pdf-jpg-donustur" element={<PdfToJpg showToast={showToast} />} />
        <Route path="/jpg-pdf-donustur" element={<JpgToPdf showToast={showToast} />} />
        <Route path="/pdf-excel-donustur" element={<PdfToExcel showToast={showToast} />} />
        <Route path="/pdf-word-donustur" element={<PdfToWord showToast={showToast} />} />
        <Route path="/pdf-sikistir" element={<Compress showToast={showToast} />} />
        <Route path="/pdf-sifrele" element={<EncryptPdf showToast={showToast} />} />
        <Route path="/pdf-sifre-kaldir" element={<DecryptPdf showToast={showToast} />} />
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
        <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '15px', fontSize: '0.9rem' }}>
          {tools.slice(1).map(tool => (
            <NavLink key={tool.path} to={tool.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              {tool.label}
            </NavLink>
          ))}
        </div>
        <p>PDFEdit tamamen bilgisayarınızda çalışır. Dosyalarınız hiçbir yere yüklenmez.</p>
      </footer>
    </>
  )
}

export default App