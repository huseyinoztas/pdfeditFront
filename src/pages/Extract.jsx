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
      url: 'https://pdfedit.com.tr/extract',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF\'den belirli sayfaları seç ve yeni bir PDF oluştur. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Hangi sayfaları girebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'Virgülle ayırarak (1, 3, 5) veya aralık belirterek (5-8) yazabilirsiniz. Birlikte de kullanılabilir: 1, 3, 5-8.' } },
        { '@type': 'Question', name: 'Sayfa çıkarma ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
        { '@type': 'Question', name: 'Orijinal dosya değişiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Orijinal dosyanız olduğu gibi kalır; yalnızca seçtiğiniz sayfalardan oluşan yeni bir PDF indirilir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir, gizliliğiniz korunur.' } },
        { '@type': 'Question', name: 'PDF\'in tüm sayfalarını ayrı ayrı istiyorum, ne yapmalıyım?', acceptedAnswer: { '@type': 'Answer', text: '"PDF Böl" aracını kullanın; her sayfayı ayrı PDF olarak dışa aktarır.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/merge', label: 'PDF Birleştir' },
  { path: '/split', label: 'PDF Böl' },
  { path: '/rotate', label: 'Sayfa Döndür' },
  { path: '/pdf-to-jpg', label: 'PDF → JPG' },
  { path: '/jpg-to-pdf', label: 'JPG → PDF' },
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
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
      triggerDownload(result.blob, 'extracted.pdf')
      showToast('✓ extracted.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Sayfa Çıkar — Belirli Sayfaları PDF'den Al"
        description="PDF'den belirli sayfaları seçin ve yeni bir PDF oluşturun. Virgülle veya aralıkla sayfa belirtin. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/extract"
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Sayfaları Çıkar
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF'den Sayfa Nasıl Çıkarılır?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Ekleyin</h3><p>Sayfa çıkarmak istediğiniz PDF dosyasını yükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sayfa Numaralarını Girin</h3><p>Virgülle (1, 3, 5) veya aralıkla (5-8) sayfa numaralarını belirtin. İkisini birlikte de kullanabilirsiniz.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Çıkar ve İndir</h3><p>Butona tıklayın; seçtiğiniz sayfalardan oluşan yeni PDF anında indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'Hangi sayfa formatlarını girebilirim?', a: 'Virgülle ayırarak (1, 3, 5) veya aralık belirterek (5-8) yazabilirsiniz. İkisini birlikte kullanabilirsiniz: 1, 3, 5-8.' },
              { q: 'Sayfa çıkarma ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt gerektirmez.' },
              { q: 'Orijinal dosya değişiyor mu?', a: 'Hayır. Orijinal dosyanız olduğu gibi kalır; sadece seçtiğiniz sayfalardan oluşan yeni PDF indirilir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir.' },
              { q: 'Tüm sayfaları ayrı ayrı almak istiyorum, ne yapmalıyım?', a: '"PDF Böl" aracını kullanın; her sayfayı ayrı PDF olarak dışa aktarır.' },
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