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
      url: 'https://pdfedit.com.tr/jpg-to-pdf',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'JPG ve PNG resimlerini tek bir PDF belgesine dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Hangi resim formatları destekleniyor?', acceptedAnswer: { '@type': 'Answer', text: 'JPG ve PNG formatları desteklenmektedir.' } },
        { '@type': 'Question', name: 'Birden fazla resim yükleyebilir miyim?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Birden fazla resim yükleyebilirsiniz; hepsi tek bir PDF\'te birleştirilir.' } },
        { '@type': 'Question', name: 'Resim sırası önemli mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Resimler listeye eklediğiniz sırayla PDF\'e yerleştirilir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: 'JPG to PDF ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsiz ve kayıt gerektirmez.' } },
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
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
  { path: '/encrypt-pdf', label: 'PDF Şifrele' },
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
      triggerDownload(result.blob, 'images.pdf')
      showToast('✓ images.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="JPG to PDF — Resimleri PDF'e Dönüştür"
        description="JPG veya PNG resimlerinizi tek bir PDF belgesine dönüştürün. Birden fazla resim ekleyin, sıralayın ve indirin. Ücretsiz, yerel çalışır."
        canonical="/jpg-to-pdf"
        schema={schema}
      />

      <header className="page-header">
        <h1>JPG to PDF</h1>
        <p>Resimlerinizi (JPG, PNG) tek bir PDF belgesi haline getirin — ücretsiz ve hızlı.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={true} acceptImages={true} icon="📷" title="Resimlerinizi buraya sürükleyin (JPG, PNG)" accept="image/*" />
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
            <li className="how-step"><span className="how-num">1</span><div><h3>Resimlerinizi Ekleyin</h3><p>JPG veya PNG dosyalarınızı alana sürükleyin ya da seçin. İstediğiniz kadar resim ekleyebilirsiniz.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sırayı Kontrol Edin</h3><p>Resimler PDF'e eklediğiniz sırayla yerleştirilir. Sırayı değiştirmek için farklı sırada ekleyin.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>PDF Oluşturun</h3><p>"JPG to PDF" butonuna tıklayın; tüm resimleriniz tek PDF olarak indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'Hangi resim formatları destekleniyor?', a: 'JPG (JPEG) ve PNG formatları desteklenmektedir.' },
              { q: 'Birden fazla resim yükleyebilir miyim?', a: 'Evet. Birden fazla resim yükleyebilirsiniz; hepsi tek bir PDF\'te birleştirilir.' },
              { q: 'Resim sırası önemli mi?', a: 'Evet. Resimler listeye eklediğiniz sırayla PDF\'e yerleştirilir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir, hiçbir dosya yüklenmez.' },
              { q: 'JPG to PDF ücretsiz mi?', a: 'Evet, tamamen ücretsiz ve kayıt gerektirmez.' },
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