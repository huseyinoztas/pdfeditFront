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
      name: 'PDF Böl — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/split',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF dosyasını sayfalara ayır. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF\'i nasıl sayfalara ayırabilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF dosyanızı yükleyin ve "Sayfalara Böl" butonuna tıklayın. Her sayfa ayrı bir PDF olarak ZIP ile indirilir.' } },
        { '@type': 'Question', name: 'Bölme işlemi ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir. Kayıt gerekmez.' } },
        { '@type': 'Question', name: 'Çıktı nasıl oluyor?', acceptedAnswer: { '@type': 'Answer', text: 'Her sayfa ayrı bir PDF dosyası olarak dışa aktarılır. Hepsi split_pages.zip arşivinde indirilir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir, hiçbir dosya yüklenmez.' } },
        { '@type': 'Question', name: 'Sadece belirli sayfaları ayırabilir miyim?', acceptedAnswer: { '@type': 'Answer', text: 'Belirli sayfaları çıkarmak için "Sayfa Çıkar" aracını kullanabilirsiniz.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/merge', label: 'PDF Birleştir' },
  { path: '/extract', label: 'Sayfa Çıkar' },
  { path: '/rotate', label: 'Sayfa Döndür' },
  { path: '/pdf-to-jpg', label: 'PDF → JPG' },
  { path: '/jpg-to-pdf', label: 'JPG → PDF' },
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
  { path: '/encrypt-pdf', label: 'PDF Şifrele' },
]

function Split({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSplit = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    const result = await apiPost('split', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'split_pages.zip')
      showToast('✓ split_pages.zip indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Böl — Ücretsiz PDF Sayfalarına Ayırma Aracı"
        description="PDF dosyanızı sayfalara ayırın. Her sayfa ayrı bir PDF olarak ZIP ile indirilir. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/split"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF Böl</h1>
        <p>PDF dosyanızı her sayfası ayrı bir dosya olacak şekilde bölün — ZIP olarak indirin.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="✂️" title="PDF dosyanızı buraya sürükleyin" />
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleSplit}
          disabled={files.length === 0 || loading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v16M4 12l8 8 8-8" />
          </svg>
          Sayfalara Böl
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl Bölünür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Ekleyin</h3><p>Bölmek istediğiniz PDF dosyasını sürükle-bırak ile alana ekleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>"Sayfalara Böl" Butonuna Tıklayın</h3><p>Butona tıkladığınızda işlem anında başlar. Dosya sunucuya yüklenmez, tüm işlem tarayıcınızda yapılır.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>ZIP Dosyasını İndirin</h3><p>Her sayfa ayrı PDF olarak split_pages.zip içinde bilgisayarınıza indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF\'i nasıl sayfalara ayırabilirim?', a: 'PDF dosyanızı yükleyin ve "Sayfalara Böl" butonuna tıklayın. Her sayfa ayrı bir PDF olarak ZIP içinde indirilir.' },
              { q: 'PDF bölme ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt gerekmez.' },
              { q: 'Çıktı nasıl oluyor?', a: 'Her sayfa ayrı bir PDF dosyası olarak dışa aktarılır; hepsi split_pages.zip arşivinde indirilir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir, hiçbir dosya sunucuya yüklenmez.' },
              { q: 'Sadece belirli sayfaları ayırabilir miyim?', a: 'Belirli sayfaları çıkarmak için "Sayfa Çıkar" aracını kullanabilirsiniz.' },
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

export default Split