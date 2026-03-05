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
      name: 'JPG to PDF — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/jpg-pdf-donustur',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'JPG ve PNG resimlerini tek bir PDF belgesine dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
  ],
}

const otherTools = [
  { path: '/pdf-birlestirme', label: 'PDF Birleştir' },
  { path: '/pdf-bolme', label: 'PDF Böl' },
  { path: '/sayfa-cikar', label: 'Sayfa Çıkar' },
  { path: '/sayfa-dondur', label: 'Sayfa Döndür' },
  { path: '/pdf-jpg-donustur', label: 'PDF → JPG' },
  { path: '/pdf-excel-donustur', label: 'PDF → Excel' },
  { path: '/pdf-word-donustur', label: 'PDF → Word' },
  { path: '/pdf-sikistir', label: 'PDF Sıkıştır' },
  { path: '/pdf-sifrele', label: 'PDF Şifrele' },
  { path: '/pdf-sifre-kaldir', label: 'PDF Şifre Kaldır' },
]

function JpgToPdf({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    const result = await apiPost('jpg-to-pdf', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'resimler.pdf')
      showToast('✓ resimler.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="JPG to PDF — Resimleri PDF'e Dönüştür"
        description="JPG veya PNG resimlerinizi tek bir PDF belgesine dönüştürün. Ücretsiz, yerel çalışır."
        canonical="/jpg-pdf-donustur"
        schema={schema}
      />

      <header className="page-header">
        <h1>JPG to PDF</h1>
        <p>Resimlerinizi (JPG, PNG) tek bir PDF belgesi haline getirin.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={true} acceptImages={true} icon="📷" title="Resimlerinizi buraya sürükleyin (JPG, PNG)" />
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
        >
          JPG to PDF
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>Resimler Nasıl PDF'e Dönüştürülür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>Resimlerinizi Ekleyin</h3><p>JPG veya PNG dosyalarınızı alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sırayı Kontrol Edin</h3><p>Resimler listeye eklediğiniz sırayla PDF'e yerleştirilir.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>PDF Oluşturun</h3><p>"JPG to PDF" butonuna tıklayın.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'Hangi resim formatları destekleniyor?', a: 'JPG ve PNG formatları desteklenmektedir.' },
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

export default JpgToPdf