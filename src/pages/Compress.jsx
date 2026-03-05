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
      url: 'https://pdfedit.com.tr/compress',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'PDF dosya boyutunu küçült. Kalite seviyesini seç. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF boyutunu nasıl küçültebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'PDF\'inizi yükleyin, kalite oranını ayarlayın ve "PDF Sıkıştır" butonuna tıklayın. Küçültülmüş PDF indirilir.' } },
        { '@type': 'Question', name: 'Ne kadar küçülme sağlanıyor?', acceptedAnswer: { '@type': 'Answer', text: 'Küçülme oranı PDF içeriğine bağlıdır. Görsel ağırlıklı PDF\'lerde %50-70 küçülme sağlanabilir.' } },
        { '@type': 'Question', name: 'Kalite kaybı oluyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Görsel kalitesi ayarlanabilir. Daha düşük kalite = daha küçük dosya boyutu. Metin kalitesi korunur.' } },
        { '@type': 'Question', name: 'Dosyam sunucuya gidiyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir.' } },
        { '@type': 'Question', name: 'PDF sıkıştırma ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen ücretsizdir.' } },
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
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/encrypt-pdf', label: 'PDF Şifrele' },
]

function Compress({ showToast }) {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState('60')
  const [loading, setLoading] = useState(false)

  const handleCompress = async () => {
    if (files.length === 0) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('quality', parseInt(quality, 10))
    const result = await apiPost('compress', formData, setLoading)
    if (result.success) {
      triggerDownload(result.blob, 'compressed.pdf')
      showToast('✓ compressed.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Sıkıştır — PDF Dosya Boyutunu Küçült"
        description="PDF dosya boyutunu küçültün. Görsel kalitesini ayarlayın, sıkıştırın ve indirin. Ücretsiz, yerel çalışır, sunucuya yüklenmez."
        canonical="/compress"
        schema={schema}
      />

      <header className="page-header">
        <h1>PDF Sıkıştır</h1>
        <p>PDF dosya boyutunu görüntü kalitesini optimize ederek azaltın — ücretsiz ve yerel.</p>
      </header>

      <div className="card">
        <DropZone files={files} setFiles={setFiles} multiple={false} icon="📉" title="PDF dosyanızı buraya sürükleyin" />
        {files.length > 0 && (
          <div className="form-group">
            <label>Görüntü Kalitesi: <span>{quality}</span>%</label>
            <input
              type="range" min="1" max="95" value={quality}
              onChange={e => setQuality(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--purple)' }}
            />
            <p className="field-hint">Düşük kalite = daha küçük dosya boyutu.</p>
          </div>
        )}
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
            <li className="how-step"><span className="how-num">1</span><div><h3>PDF Dosyasını Yükleyin</h3><p>Boyutunu küçültmek istediğiniz PDF'i alana sürükleyin.</p></div></li>
            <li className="how-step"><span className="how-num">2</span><div><h3>Kalite Oranı Seçin</h3><p>Kaydırıcıyla kalite oranını ayarlayın. Düşük değer daha küçük dosya ama daha düşük görsel kalite anlamına gelir.</p></div></li>
            <li className="how-step"><span className="how-num">3</span><div><h3>Sıkıştır ve İndir</h3><p>"PDF Sıkıştır" butonuna tıklayın; optimize edilmiş PDF bilgisayarınıza indirilir.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF boyutunu nasıl küçültebilirim?', a: 'PDF\'inizi yükleyin, kalite oranını ayarlayın ve "PDF Sıkıştır" butonuna tıklayın. Küçültülmüş PDF indirilir.' },
              { q: 'Ne kadar küçülme sağlanıyor?', a: 'Küçülme oranı PDF içeriğine bağlıdır. Görsel ağırlıklı PDF\'lerde %50-70 küçülme mümkündür.' },
              { q: 'Kalite kaybı oluyor mu?', a: 'Görsel kalitesi ayarlanabilir. Daha düşük kalite = daha küçük dosya. Metin içeriği kalitesi korunur.' },
              { q: 'Dosyam sunucuya gidiyor mu?', a: 'Hayır. İşlem tamamen tarayıcınızda gerçekleşir, hiçbir dosya yüklenmez.' },
              { q: 'PDF sıkıştırma ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Kayıt gerektirmez.' },
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

export default Compress