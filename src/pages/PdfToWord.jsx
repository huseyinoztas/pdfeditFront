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
      name: 'PDF to Word — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/pdf-to-word',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF içeriğini düzenlenebilir Word (DOCX) belgesine dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF\'i Word\'e nasıl dönüştürebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF dosyanızı yükleyin ve "PDF to Word" butonuna tıklayın. Metin içeriği .docx formatında indirilir.' } },
        { '@type': 'Question', name: 'Biçimlendirme (font, başlık) korunuyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Temel metin yapısı korunmaya çalışılır; karmaşık PDF düzenlerinde bazı farklılıklar olabilir.' } },
        { '@type': 'Question', name: 'PDF to Word ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: 'Çıktı hangi Word sürümüyle açılabilir?', acceptedAnswer: { '@type': 'Answer', text: 'Çıktı .docx formatındadır; Microsoft Word 2007+, LibreOffice ve Google Docs ile açılabilir.' } },
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
  { path: '/compress', label: 'PDF Sıkıştır' },
  { path: '/encrypt-pdf', label: 'PDF Şifrele' },
]

function PdfToWord({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    const result = await apiPost('pdf-to-word', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'document.docx')
      showToast('✓ document.docx indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF to Word — PDF'i DOCX Belgesine Dönüştür"
        description="PDF içeriğini düzenlenebilir Word (.docx) belgesine dönüştürün. Ücretsiz, yerel çalışır, kayıt gerektirmez, sunucuya yüklenmez."
        canonical="/pdf-to-word"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF to Word</h1>
        <p>PDF içeriğini düzenlenebilir Word (.docx) belgesine aktarın — kayıt gerektirmez.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="📝" title="PDF dosyanızı buraya sürükleyin" />
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleConvert}
          disabled={files.length === 0 || loading}
        >
          PDF to Word
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl Word'e Dönüştürülür?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Yükleyin</h3><p>Word'e dönüştürmek istediğiniz PDF'i alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Dönüştürme Başlatın</h3><p>"PDF to Word" butonuna tıklayın. PDF metni otomatik olarak çıkarılır.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Word Dosyasını İndirin</h3><p>Düzenlenebilir .docx dosyası bilgisayarınıza indirilir; Word veya LibreOffice ile açın.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF\'i Word\'e nasıl dönüştürebilirim?', a: 'PDF dosyanızı yükleyin ve "PDF to Word" butonuna tıklayın. Metin içeriği .docx formatında indirilir.' },
              { q: 'Biçimlendirme (font, başlık) korunuyor mu?', a: 'Temel metin yapısı korunmaya çalışılır; karmaşık PDF düzenlerinde bazı farklılıklar olabilir.' },
              { q: 'PDF to Word ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt gerekmez.' },
              { q: 'Dosyam sunucuya yükleniyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' },
              { q: 'Çıktı hangi Word sürümüyle açılabilir?', a: 'Çıktı .docx formatındadır; Microsoft Word 2007+, LibreOffice ve Google Docs ile açılabilir.' },
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

export default PdfToWord