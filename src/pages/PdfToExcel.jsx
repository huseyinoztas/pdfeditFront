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
      url: 'https://pdfedit.com.tr/pdf-excel-donustur',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF tablolarını Excel (XLSX) formatına dönüştür. Ücretsiz, yerel, kayıt gerektirmez.',
    },
  ],
}

const otherTools = [
  { path: '/pdf-birlestirme', label: 'PDF Birleştir' },
  { path: '/pdf-bolme', label: 'PDF Böl' },
  { path: '/sayfa-cikar', label: 'Sayfa Çıkar' },
  { path: '/sayfa-dondur', label: 'Sayfa Döndür' },
  { path: '/pdf-jpg-donustur', label: 'PDF → JPG' },
  { path: '/jpg-pdf-donustur', label: 'JPG → PDF' },
  { path: '/pdf-word-donustur', label: 'PDF → Word' },
  { path: '/pdf-sikistir', label: 'PDF Sıkıştır' },
  { path: '/pdf-sifrele', label: 'PDF Şifrele' },
  { path: '/pdf-sifre-kaldir', label: 'PDF Şifre Kaldır' },
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
      triggerDownload(result.blob, 'tablolar.xlsx')
      showToast('✓ tablolar.xlsx indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF to Excel — PDF Tablolarını XLSX'e Dönüştür"
        description="PDF içindeki tabloları Excel (XLSX) formatına dönüştürün. Ücretsiz, yerel çalışır."
        canonical="/pdf-excel-donustur"
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
            <li className="how-step"><span className="how-num">2</span><div><h3>Dönüştürme Başlatın</h3><p>"PDF to Excel" butonuna tıklayın.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Excel Dosyasını İndirin</h3><p>.xlsx dosyası anında indirilir.</p></div></li>
          </ol>
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