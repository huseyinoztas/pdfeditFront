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
      name: 'PDF Birleştir — PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: 'https://pdfedit.com.tr/pdf-birlestirme',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'Birden fazla PDF dosyasını tek belgede birleştir. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF birleştirme ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. PDFEdit\'te PDF birleştirme tamamen ücretsizdir, kayıt gerekmez.' } },
        { '@type': 'Question', name: 'Kaç PDF dosyasını birleştirebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'İstediğiniz kadar PDF ekleyebilirsiniz.' } },
        { '@type': 'Question', name: 'Dosya sırası önemli mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Dosyalar listeye eklediğiniz sırayla birleştirilir.' } },
        { '@type': 'Question', name: 'Birleştirdiğim dosya sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/pdf-bolme', label: 'PDF Böl' },
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

function Merge({ showToast }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleMerge = async () => {
    if (files.length < 2) return
    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    const result = await apiPost('merge', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'birlestirilen.pdf')
      showToast('✓ birlestirilen.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Birleştirme — Ücretsiz Online PDF Merge Aracı"
        description="Birden fazla PDF dosyasını tek belgede birleştir. Ücretsiz, kayıt gerektirmez, dosyalar sunucuya yüklenmez. Hızlı ve güvenli PDF birleştirme aracı."
        canonical="/pdf-birlestirme"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF Birleştir</h1>
        <p>Birden fazla PDF dosyasını tek bir belgede birleştirin — ücretsiz, sunucu gerektirmez.</p>
      </header>

      <div className="card">
        <DropZone
          files={files}
          setFiles={setFiles}
          multiple={true}
          icon="📄"
          title="PDF dosyalarınızı buraya sürükleyin"
        />
        <p className="hint">
          {files.length === 0
            ? 'Birleştirmek için en az 2 PDF dosyası ekleyin.'
            : files.length === 1
              ? 'En az bir PDF daha ekleyin.'
              : `${files.length} dosya hazır — Birleştir butonuna tıklayın.`}
        </p>
        <button
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
        >
          PDF Birleştir
        </button>
      </div>

      <section className="how-section">
        <div className="how-inner">
          <h2>Nasıl PDF Birleştirilir?</h2>
          <ol className="how-steps">
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyalarını Ekleyin</h3><p>Birleştirmek istediğiniz tüm PDF dosyalarını sürükle-bırak ile ekleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Dosyaları Kontrol Edin</h3><p>Eklenen dosyaların listesini kontrol edin.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Birleştir ve İndir</h3><p>"PDF Birleştir" butonuna tıklayın. İşlem anında tamamlanır ve indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF birleştirme ücretsiz mi?', a: 'Evet. PDFEdit\'te PDF birleştirme tamamen ücretsizdir. Kayıt veya ödeme gerekmez.' },
              { q: 'Kaç PDF dosyasını birleştirebilirim?', a: 'Sınırsız sayıda PDF ekleyebilirsiniz.' },
              { q: 'Dosya sırası önemli mi?', a: 'Evet. PDF\'ler listeye eklediğiniz sırayla birleştirilir.' },
              { q: 'Birleştirdiğim dosya sunucuya yükleniyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir.' },
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

export default Merge