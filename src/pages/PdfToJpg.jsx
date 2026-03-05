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
      name: 'PDF to JPG — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/pdf-to-jpg',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF sayfalarını yüksek kaliteli JPG görüntülerine dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF\'i JPG\'ye nasıl dönüştürebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF dosyanızı yükleyin, DPI değerini seçin ve "PDF to JPG" butonuna tıklayın. Tüm sayfalar ZIP içinde indirilir.' } },
        { '@type': 'Question', name: 'DPI nedir, ne seçmeliyim?', acceptedAnswer: { '@type': 'Answer', text: 'DPI görüntü kalitesini belirler. 150 DPI standart, 300 DPI yüksek kalite için uygundur. Baskı için 300 öneririz.' } },
        { '@type': 'Question', name: 'Tüm sayfalar dönüştürülüyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. PDF\'in her sayfası ayrı bir JPG dosyasına dönüştürülür; hepsi ZIP olarak indirilir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: 'PNG formatında çıktı alabilir miyim?', acceptedAnswer: { '@type': 'Answer', text: 'Şu an yalnızca JPG formatı desteklenmektedir.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/merge', label: 'PDF Birleştir' },
  { path: '/split', label: 'PDF Böl' },
  { path: '/extract', label: 'Sayfa Çıkar' },
  { path: '/rotate', label: 'Sayfa Döndür' },
  { path: '/jpg-to-pdf', label: 'JPG → PDF' },
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
]

function PdfToJpg({ showToast }) {
  const [files, setFiles] = useState([])
  const [dpi, setDpi] = useState('150')
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('dpi', dpi || 150)
    const result = await apiPost('pdf-to-jpg', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'pdf_images.zip')
      showToast('✓ pdf_images.zip indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF to JPG — PDF Sayfalarını Görüntüye Dönüştür"
        description="PDF sayfalarını yüksek kaliteli JPG görüntülerine dönüştürün. DPI seçin, ZIP olarak indirin. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/pdf-to-jpg"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF to JPG</h1>
        <p>PDF sayfalarını yüksek kaliteli JPG görüntülerine dönüştürün — ZIP olarak indirin.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="🖼️" title="PDF dosyanızı buraya sürükleyin" />
        {files.length > 0 && (
          <div className="form-group">
            <label>Çözünürlük (DPI)</label>
            <input type="number" value={dpi} onChange={e => setDpi(e.target.value)} min="72" max="300" />
            <p className="field-hint">Standart 150'dir. Yüksek kalite için 300 kullanın.</p>
          </div>
        )}
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
        >
          PDF to JPG
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl JPG'ye Dönüştürülür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Yükleyin</h3><p>Dönüştürmek istediğiniz PDF'i alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>DPI Değerini Seçin</h3><p>Standart için 150, yüksek baskı kalitesi için 300 DPI seçin.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Dönüştür ve İndir</h3><p>Her PDF sayfası ayrı bir JPG olarak PDF_images.zip içinde indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF\'i JPG\'ye nasıl dönüştürebilirim?', a: 'PDF dosyanızı yükleyin, DPI değerini seçin ve "PDF to JPG" butonuna tıklayın. Tüm sayfalar ZIP içinde indirilir.' },
              { q: 'DPI nedir, ne seçmeliyim?', a: 'DPI görüntü çözünürlüğünü belirler. 150 DPI standart ekran için, 300 DPI baskı kalitesi için uygundur.' },
              { q: 'Tüm sayfalar dönüştürülüyor mu?', a: 'Evet. PDF\'in her sayfası ayrı bir JPG dosyasına dönüştürülür; hepsi ZIP olarak indirilir.' },
              { q: 'Dosyam sunucuya yükleniyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir, dosyalarınız sunucuya gönderilmez.' },
              { q: 'PNG formatında çıktı alabilir miyim?', a: 'Şu an yalnızca JPG formatı desteklenmektedir.' },
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

export default PdfToJpg