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
      name: 'PDF to Excel — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/pdf-to-excel',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF tablolarını Excel (XLSX) formatına dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF\'deki tablolar Excel\'e doğru aktarılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Tablo yapısı korunmaya çalışılır; ancak karmaşık PDF tablolarında bazı kayıplar olabilir.' } },
        { '@type': 'Question', name: 'PDF to Excel ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
        { '@type': 'Question', name: 'Çıktı formatı ne?', acceptedAnswer: { '@type': 'Answer', text: 'Çıktı .xlsx formatında gelir; Microsoft Excel, LibreOffice Calc ve Google Sheets ile açılabilir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: 'Birden fazla sayfa Excel\'e aktarılıyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, PDF\'deki tüm sayfalar taranır ve bulunan tablolar Excel\'e aktarılır.' } },
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
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
]

function PdfToExcel({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    const result = await apiPost('pdf-to-excel', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'extracted_tables.xlsx')
      showToast('✓ extracted_tables.xlsx indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF to Excel — PDF Tablolarını XLSX'e Dönüştür"
        description="PDF içindeki tabloları Excel (XLSX) formatına dönüştürün. Ücretsiz, yerel çalışır, kayıt gerektirmez, sunucuya yüklenmez."
        canonical="/pdf-to-excel"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF to Excel</h1>
        <p>PDF tablolarını düzenlenebilir Excel (.xlsx) tablolarına dönüştürün.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="📊" title="PDF dosyanızı buraya sürükleyin" />
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
        >
          PDF to Excel
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl Excel'e Dönüştürülür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Yükleyin</h3><p>Excel'e aktarmak istediğiniz PDF'i alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Dönüştürme Başlatın</h3><p>"PDF to Excel" butonuna tıklayın. PDF içindeki tablolar otomatik olarak algılanır.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Excel Dosyasını İndirin</h3><p>Tablo verilerini içeren .xlsx dosyası bilgisayarınıza indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF\'deki tablolar Excel\'e doğru aktarılıyor mu?', a: 'Tablo yapısı korunmaya çalışılır; ancak karmaşık veya görsel tabanlı PDF\'lerde bazı düzensizlikler olabilir.' },
              { q: 'PDF to Excel ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt gerekmez.' },
              { q: 'Çıktı formatı ne?', a: 'Çıktı .xlsx formatında gelir; Microsoft Excel, LibreOffice Calc ve Google Sheets ile açılabilir.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' },
              { q: 'Birden fazla sayfa dönüştürülüyor mu?', a: 'Evet, PDF\'deki tüm sayfalar taranır ve bulunan tablolar Excel\'e aktarılır.' },
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

export default PdfToExcel