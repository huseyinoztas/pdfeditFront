import { useState } from 'react'
import { Link } from 'react-router-dom'
import DropZone from '../components/DropZone'
import { apiPost, triggerDownload } from '../hooks/useApi'
import SEO from '../components/SEO'

const schema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'SoftwareApplication',
            name: 'PDF Şifre Kaldır — PDFEdit',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            url: 'https://pdfedit.com.tr/pdf-sifre-kaldir',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
            description: 'Şifreli PDF dosyanızın parolasını kaldırın. Ücretsiz, yerel, kayıt gerektirmez.',
        },
    ],
}

const otherTools = [
    { path: '/pdf-birlestirme', label: 'PDF Birleştir' },
    { path: '/pdf-bolme', label: 'PDF Böl' },
    { path: '/sayfa-cikar', label: 'Sayfa Çıkar' },
    { path: '/sayfa-dondur', label: 'Sayfa Döndür' },
    { path: '/pdf-jpg-donustur', label: 'PDF → JPG' },
    { path: '/jpg-pdf-donustur', label: 'JPG → PDF' },
    { path: '/pdf-excel-donustur', label: 'PDF → Excel' },
    { path: '/pdf-word-donustur', label: 'PDF → Word' },
    { path: '/pdf-sikistir', label: 'PDF Sıkıştır' },
    { path: '/pdf-sifrele', label: 'PDF Şifrele' },
]

function DecryptPdf({ showToast }) {
    const [files, setFiles] = useState([])
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDecrypt = async () => {
        if (files.length === 0 || !password) return
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('password', password)
        const result = await apiPost('decrypt-pdf', formData, setLoading)
        if (result.success) {
            triggerDownload(result.blob, 'sifresi_kaldirilmis.pdf')
            showToast('✓ sifresi_kaldirilmis.pdf indirildi!', 'success')
        } else {
            showToast(`✗ ${result.error}`, 'error')
        }
    }

    return (
        <div className="page-container">
            <SEO
                title="PDF Şifre Kaldır — Şifreli PDF'i Aç"
                description="Şifreli PDF dosyanızın parolasını kaldırın. Ücretsiz, yerel çalışır."
                canonical="/pdf-sifre-kaldir"
                schema={schema}
            />

            <header className="page-header">
                <h1>PDF Şifre Kaldır</h1>
                <p>Şifreli PDF dosyanızın parolasını kaldırın — ücretsiz ve yerel.</p>
            </header>

            <div className="card">
                <DropZone files={files} setFiles={setFiles} multiple={false} icon="🔓" title="Şifreli PDF dosyanızı buraya sürükleyin" />
                {files.length > 0 && (
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Mevcut Parola</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="PDF'in mevcut parolasını girin…"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.65rem 2.5rem 0.65rem 0.85rem',
                                    borderRadius: '10px',
                                    border: '1.5px solid var(--border)',
                                    background: 'var(--card)',
                                    color: 'var(--text)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                {showPw ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                )}
                <button
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    onClick={handleDecrypt}
                    disabled={files.length === 0 || !password || loading}
                    style={{ marginTop: '1rem' }}
                >
                    🔓 Şifreyi Kaldır ve İndir
                </button>
            </div>

            <section className="internal-links">
                <h2>Diğer PDF Araçları</h2>
                <div className="internal-links-grid">
                    {otherTools.map(t => <Link key={t.path} to={t.path} className="internal-link">{t.label}</Link>)}
                </div>
            </section>
        </div>
    )
}

export default DecryptPdf
