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
            name: 'PDF Şifrele — PDFEdit',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            url: 'https://pdfedit.com.tr/encrypt-pdf',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
            description: 'PDF dosyanızı parola ile şifreleyin. AES-256 şifreleme. Ücretsiz, yerel, kayıt gerektirmez.',
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                { '@type': 'Question', name: 'PDF şifreleme ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir. Kayıt gerekmez.' } },
                { '@type': 'Question', name: 'Hangi şifreleme yöntemi kullanılıyor?', acceptedAnswer: { '@type': 'Answer', text: 'AES-256 standardı kullanılarak PDF şifrelenir.' } },
                { '@type': 'Question', name: 'Dosyam sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; dosyalarınız asla sunucuya gönderilmez.' } },
                { '@type': 'Question', name: 'Şifremi unutursam ne olur?', acceptedAnswer: { '@type': 'Answer', text: 'Şifreli PDF\'lerin şifresi kurtarılamaz. Lütfen parolanızı güvenli bir yerde saklayın.' } },
            ],
        },
    ],
}

const otherTools = [
    { path: '/merge', label: 'PDF Birleştir' },
    { path: '/split', label: 'PDF Böl' },
    { path: '/extract', label: 'Sayfa Çıkar' },
    { path: '/rotate', label: 'Sayfa Döndür' },
    { path: '/pdf-to-jpg', label: 'PDF → JPG' },
    { path: '/jpg-to-pdf', label: 'JPG → PDF' },
    { path: '/pdf-to-excel', label: 'PDF → Excel' },
    { path: '/pdf-to-word', label: 'PDF → Word' },
    { path: '/compress', label: 'PDF Sıkıştır' },
]

function EncryptPdf({ showToast }) {
    const [files, setFiles] = useState([])
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleEncrypt = async () => {
        if (files.length === 0 || !password) return
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('password', password)
        const result = await apiPost('encrypt-pdf', formData, setLoading)
        if (result.success) {
            triggerDownload(result.blob, 'encrypted.pdf')
            showToast('✓ encrypted.pdf indirildi!', 'success')
        } else {
            showToast(`✗ ${result.error}`, 'error')
        }
    }

    return (
        <div className="page-container">
            <SEO
                title="PDF Şifrele — Parola ile PDF Koruma"
                description="PDF dosyanızı parola ile şifreleyin. AES-256 şifreleme. Ücretsiz, yerel çalışır, dosyalar sunucuya yüklenmez."
                canonical="/encrypt-pdf"
                schema={schema}
            />

            <header className="page-header">
                <h1>PDF Şifrele</h1>
                <p>PDF dosyanızı parola ile koruyun — ücretsiz, tarayıcınızda çalışır, hiçbir dosya yüklenmez.</p>
            </header>

            <div className="card">
                <DropZone
                    files={files}
                    setFiles={setFiles}
                    multiple={false}
                    icon="🔒"
                    title="PDF dosyanızı buraya sürükleyin"
                />

                {files.length > 0 && (
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Parola</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="Güçlü bir parola girin…"
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
                            <button
                                type="button"
                                onClick={() => setShowPw(v => !v)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    color: 'var(--text-muted)',
                                    padding: 0,
                                }}
                                title={showPw ? 'Gizle' : 'Göster'}
                            >
                                {showPw ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <p className="field-hint">Bu parolayı unutmayın — şifreli PDF'lerin parolası kurtarılamaz.</p>
                    </div>
                )}

                <button
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    onClick={handleEncrypt}
                    disabled={files.length === 0 || !password || loading}
                    style={{ marginTop: '1rem' }}
                >
                    🔒 PDF'i Şifrele ve İndir
                </button>
            </div>

            <section className="how-section">
                <div className="how-inner">
                    <h2>PDF Nasıl Şifrelenir?</h2>
                    <ol className="how-steps">
                        <li className="how-step">
                            <span className="how-num">1</span>
                            <div>
                                <h3>PDF Dosyasını Ekleyin</h3>
                                <p>Şifrelemek istediğiniz PDF'i sürükle-bırak ya da tıklayarak ekleyin.</p>
                            </div>
                        </li>
                        <li className="how-step">
                            <span className="how-num">2</span>
                            <div>
                                <h3>Parolanızı Girin</h3>
                                <p>Belgenizi korumak istediğiniz güçlü bir parola yazın. Bu parolayı unutmayın.</p>
                            </div>
                        </li>
                        <li className="how-step">
                            <span className="how-num">3</span>
                            <div>
                                <h3>Şifrele ve İndir</h3>
                                <p>"PDF'i Şifrele" butonuna tıklayın. Şifreli PDF anında bilgisayarınıza indirilir.</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            <section className="faq-section">
                <div className="faq-inner">
                    <h2>Sık Sorulan Sorular</h2>
                    <div className="faq-list">
                        {[
                            { q: 'PDF şifreleme ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt veya ödeme gerekmez.' },
                            { q: 'Hangi şifreleme yöntemi kullanılıyor?', a: 'AES-256 standardı kullanılarak PDF şifrelenir; endüstri standardı bir güvenlik seviyesi sunar.' },
                            { q: 'Dosyam sunucuya yükleniyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; dosyalarınız asla sunucuya gönderilmez, gizliliğiniz korunur.' },
                            { q: 'Şifremi unutursam ne olur?', a: 'Şifreli PDF\'lerin parolası kurtarılamaz. Lütfen parolanızı güvenli bir yerde (şifre yöneticisi vb.) saklayın.' },
                        ].map(({ q, a }, i) => (
                            <details key={i} className="faq-item">
                                <summary className="faq-q">{q}</summary>
                                <p className="faq-a">{a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="internal-links">
                <h2>Diğer PDF Araçları</h2>
                <div className="internal-links-grid">
                    {otherTools.map(t => <Link key={t.path} to={t.path} className="internal-link">{t.label}</Link>)}
                </div>
            </section>
        </div>
    )
}

export default EncryptPdf
