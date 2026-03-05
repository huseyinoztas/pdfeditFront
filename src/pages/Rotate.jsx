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
      name: 'PDF Döndür — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/rotate',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF sayfalarını 90°, 180° veya 270° döndür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF sayfasını nasıl döndürebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF\'inizi yükleyin, açıyı seçin (90°, 180° veya 270°) ve hangi sayfaları döndüreceğinizi belirtin. "Sayfaları Döndür" butonuyla indirin.' } },
        { '@type': 'Question', name: 'Sadece bazı sayfaları döndürebilir miyim?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Sayfa numaralarını virgülle (1, 3) veya aralıkla (5-8) girebilirsiniz. Tüm belge için "all" yazın.' } },
        { '@type': 'Question', name: 'PDF döndürme ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: '180° döndürme ne işe yarar?', acceptedAnswer: { '@type': 'Answer', text: 'Sayfaları baş aşağı çevirir. Tarayıcıdan ters taranan belgeleri düzeltmek için kullanışlıdır.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/merge', label: 'PDF Birleştir' },
  { path: '/split', label: 'PDF Böl' },
  { path: '/extract', label: 'Sayfa Çıkar' },
  { path: '/pdf-to-jpg', label: 'PDF → JPG' },
  { path: '/jpg-to-pdf', label: 'JPG → PDF' },
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
  { path: '/encrypt-pdf', label: 'PDF Şifrele' },
]

function Rotate({ showToast }) {
  const [files, setFiles] = useState([])
  const [pages, setPages] = useState('all')
  const [angle, setAngle] = useState('90')
  const [loading, setLoading] = useState(false)

  const handleRotate = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('pages', pages.trim() || 'all')
    formData.append('angle', angle)
    const result = await apiPost('rotate', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'rotated.pdf')
      showToast('✓ rotated.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Döndür — Sayfaları 90°, 180°, 270° Çevir"
        description="PDF sayfalarını 90°, 180° veya 270° döndürün. Tüm belgeyi veya belirli sayfaları seçin. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/rotate"
        schema={schema}
      />

      <header className="page-header">
        <h1>Sayfa Döndür</h1>
        <p>PDF sayfalarını 90°, 180° veya 270° döndürün — belirli sayfaları seçebilirsiniz.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="🔄" title="PDF dosyanızı buraya sürükleyin" />

        {files.length > 0 && (
          <div className="form-group">
            <label>Döndürülecek sayfalar</label>
            <input type="text" value={pages} onChange={e => setPages(e.target.value)} placeholder="örn. 1, 3, 5-8 veya all" />
            <p className="field-hint">Tüm belge için <code>all</code> kullanın veya sayfa belirtin <code>1, 3, 5-8</code></p>

            <label>Dönüş açısı</label>
            <div className="angle-group">
              {[['90', '90° ↻'], ['180', '180°'], ['270', '270° ↺']].map(([val, label]) => (
                <label key={val} className="angle-option">
                  <input type="radio" name="angle" value={val} checked={angle === val} onChange={e => setAngle(e.target.value)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleRotate}
          disabled={files.length === 0 || loading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" />
          </svg>
          Sayfaları Döndür
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Sayfası Nasıl Döndürülür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyanızı Yükleyin</h3><p>Döndürmek istediğiniz PDF dosyasını alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sayfa ve Açı Seçin</h3><p>Hangi sayfaları döndüreceğinizi girin (tümü için "all") ve açıyı seçin: 90°, 180° veya 270°.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Döndür ve İndir</h3><p>Butona tıklayın; döndürülmüş PDF anında indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF sayfasını nasıl döndürebilirim?', a: 'PDF\'inizi yükleyin, açıyı seçin (90°, 180° veya 270°) ve hangi sayfaları döndüreceğinizi belirtin. "Sayfaları Döndür" butonuyla indirin.' },
              { q: 'Sadece bazı sayfaları döndürebilir miyim?', a: 'Evet. Sayfa numaralarını virgülle (1, 3) veya aralıkla (5-8) girebilirsiniz. Tüm belge için "all" yazın.' },
              { q: 'PDF döndürme ücretsiz mi?', a: 'Evet, tamamen ücretsizdir.' },
              { q: 'Dosyam sunucuya yükleniyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir, hiçbir dosya sunucuya gönderilmez.' },
              { q: '180° döndürme ne işe yarar?', a: 'Sayfaları baş aşağı çevirir. Tarayıcıdan ters taranan belgeleri düzeltmek için kullanışlıdır.' },
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

export default Rotate