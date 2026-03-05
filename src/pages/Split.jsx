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
      url: 'https://pdfedit.com.tr/pdf-bolme',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF dosyasını sayfalara ayır. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF\'i nasıl sayfalara ayırabilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF dosyanızı yükleyin ve "Sayfalara Böl" butonuna tıklayın. ZIP ile indirilir.' } },
        { '@type': 'Question', name: 'Bölme işlemi ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/pdf-birlestirme', label: 'PDF Birleştir' },
  { path: '/sayfa-cikar', label: 'Sayfa Çıkar' },
  { path: '/sayfa-dondur', label: 'Sayfa Döndür' },
  { path: '/pdf-jpg-donustur', label: 'PDF → JPG' },
  { path: '/jpg-pdf-donustur', label: 'JPG → PDF' },
  { path: '/pdf-excel-donustur', label: 'PDF → Excel' },
  { path: '/pdf-word-donustur', label: 'PDF → Word' },
  { path: '/pdf-sikistir', label: 'PDF Sıkıştır' },
  { path: '/pdf-sifrele', label: 'PDF Şifrele' },
  { path: '/pdf-sifre-kaldir', label: 'PDF Şifre Kaldır' },
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
      triggerDownload(result.blob, 'bolunmus_sayfalar.zip')
      showToast('✓ bolunmus_sayfalar.zip indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Bölme — Ücretsiz PDF Sayfalara Ayırma Aracı"
        description="PDF dosyanızı sayfalara ayırın. Her sayfa ayrı bir PDF olarak ZIP ile indirilir. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/pdf-bolme"
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
          Sayfalara Böl
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl Bölünür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Ekleyin</h3><p>Bölmek istediğiniz PDF dosyasını alana ekleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>"Sayfalara Böl" Butonuna Tıklayın</h3><p>İşlem anında başlar; tüm işlem tarayıcınızda yapılır.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>ZIP Dosyasını İndirin</h3><p>Her sayfa ayrı PDF olarak ZIP içinde indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF\'i nasıl sayfalara ayırabilirim?', a: 'PDF dosyanızı yükleyin ve "Sayfalara Böl" butonuna tıklayın. ZIP içinde indirilir.' },
              { q: 'PDF bölme ücretsiz mi?', a: 'Evet, tamamen ücretsizdir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' },
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