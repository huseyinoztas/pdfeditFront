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
      name: 'PDF Sıkıştır — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/pdf-sikistir',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF dosya boyutunu küçült. Ücretsiz, yerel, kayıt gerektirmez.',
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
  { path: '/pdf-excel-donustur', label: 'PDF → Excel' },
  { path: '/pdf-word-donustur', label: 'PDF → Word' },
  { path: '/pdf-sifrele', label: 'PDF Şifrele' },
  { path: '/pdf-sifre-kaldir', label: 'PDF Şifre Kaldır' },
]

function Compress({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCompress = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    const result = await apiPost('compress', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'sikistirilmis.pdf')
      showToast('✓ sikistirilmis.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Sıkıştır — PDF Dosya Boyutunu Küçült"
        description="PDF dosya boyutunu kaliteyi bozmadan küçültün. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/pdf-sikistir"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF Sıkıştır</h1>
        <p>PDF dosya boyutunu kaliteyi optimize ederek azaltın — ücretsiz ve hızlı.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="📉" title="PDF dosyanızı buraya sürükleyin" />
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleCompress}
          disabled={files.length === 0 || loading}
        >
          PDF Sıkıştır
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>PDF Nasıl Sıkıştırılır?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Yükleyin</h3><p>Sıkıştırmak istediğiniz PDF'i alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Sıkıştırmayı Başlatın</h3><p>"PDF Sıkıştır" butonuna tıklayın. İşlem tarayıcıda yapılır.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>İndirin</h3><p>Küçültülmüş PDF anında indirilir.</p></div></li>
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

export default Compress