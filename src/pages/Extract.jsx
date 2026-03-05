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
      name: 'PDF Sayfa Çıkar — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/sayfa-cikar',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF\'den belirli sayfaları seç ve yeni bir PDF oluştur. Ücretsiz, yerel, kayıt gerektirmez.',
    },
  ],
}

const otherTools = [
  { path: '/pdf-birlestirme', label: 'PDF Birleştir' },
  { path: '/pdf-bolme', label: 'PDF Böl' },
  { path: '/sayfa-dondur', label: 'Sayfa Döndür' },
  { path: '/pdf-jpg-donustur', label: 'PDF → JPG' },
  { path: '/jpg-pdf-donustur', label: 'JPG → PDF' },
  { path: '/pdf-excel-donustur', label: 'PDF → Excel' },
  { path: '/pdf-word-donustur', label: 'PDF → Word' },
  { path: '/pdf-sikistir', label: 'PDF Sıkıştır' },
  { path: '/pdf-sifrele', label: 'PDF Şifrele' },
  { path: '/pdf-sifre-kaldir', label: 'PDF Şifre Kaldır' },
]

function Extract({ showToast }) {
  const [files, setFiles] = useState([])
  const [pages, setPages] = useState('')
  const [loading, setLoading] = useState(false)

  const handleExtract = async () => {
    if (files.length === 0 || !pages.trim()) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('pages', pages.trim())
    const result = await apiPost('extract', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'cikartilan_sayfalar.pdf')
      showToast('✓ cikartilan_sayfalar.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Sayfa Çıkarma — Belirli Sayfaları PDF'den Al"
        description="PDF'den belirli sayfaları seçin ve yeni bir PDF oluşturun. Virgülle veya aralıkla sayfa belirtin. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/sayfa-cikar"
        schema={schema}
      />

      <header className="page-header">
        <h1>Sayfa Çıkar</h1>
        <p>PDF'den belirli sayfaları seçerek yeni bir PDF dosyası oluşturun.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="📋" title="PDF dosyanızı buraya sürükleyin" />
        {files.length > 0 && (
          <div className="form-group">
            <label>Çıkarılacak sayfalar</label>
            <input type="text" value={pages} onChange={e => setPages(e.target.value)} placeholder="örn. 1, 3, 5-8" />
            <p className="field-hint">Virgül ve aralık kullanın. Örnek: <code>1, 3, 5-8</code></p>
          </div>
        )}
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleExtract}
          disabled={files.length === 0 || !pages.trim() || loading}
        >
          Sayfaları Çıkar
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF'den Sayfa Nasıl Çıkarılır?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Ekleyin</h3><p>Sayfa çıkarmak istediğiniz PDF dosyasını yükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sayfa Numaralarını Girin</h3><p>Virgülle (1, 3, 5) veya aralıkla (5-8) sayfa numaralarını belirtin.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Çıkar ve İndir</h3><p>Butona tıklayın; seçtiğiniz sayfalardan oluşan yeni PDF indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'Hangi sayfa formatlarını girebilirim?', a: 'Virgülle ayırarak (1, 3, 5) veya aralık belirterek (5-8) yazabilirsiniz.' },
              { q: 'Sayfa çıkarma ücretsiz mi?', a: 'Evet, tamamen ücretsizdir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir.' },
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

export default Extract