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
      url: 'https://pdfedit.com.tr/merge',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: 'Birden fazla PDF dosyasını tek belgede birleştir. Ücretsiz, yerel, kayıt gerektirmez.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'PDF birleştirme ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. PDFEdit\'te PDF birleştirme tamamen ücretsizdir, kayıt gerekmez.' } },
        { '@type': 'Question', name: 'Kaç PDF dosyasını birleştirebilirim?', acceptedAnswer: { '@type': 'Answer', text: 'İstediğiniz kadar PDF ekleyebilirsiniz. Tarayıcı belleğinizle sınırlıdır.' } },
        { '@type': 'Question', name: 'Dosya sırası önemli mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Dosyalar listeye eklediğiniz sırayla birleştirilir; sırayı değiştirmek için dosyaları farklı sırada ekleyebilirsiniz.' } },
        { '@type': 'Question', name: 'Birleştirdiğim dosya sunucuya yükleniyor mu?', acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir. Dosyalarınız asla sunucuya gönderilmez.' } },
        { '@type': 'Question', name: 'Çıktı dosyasının adı ne olur?', acceptedAnswer: { '@type': 'Answer', text: 'merged.pdf adıyla otomatik olarak indirilir.' } },
      ],
    },
  ],
}

const otherTools = [
  { path: '/split', label: 'PDF Böl' },
  { path: '/extract', label: 'Sayfa Çıkar' },
  { path: '/rotate', label: 'Sayfa Döndür' },
  { path: '/pdf-to-jpg', label: 'PDF → JPG' },
  { path: '/jpg-to-pdf', label: 'JPG → PDF' },
  { path: '/pdf-to-excel', label: 'PDF → Excel' },
  { path: '/pdf-to-word', label: 'PDF → Word' },
  { path: '/compress', label: 'PDF Sıkıştır' },
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
      triggerDownload(result.blob, 'merged.pdf')
      showToast('✓ merged.pdf indirildi!', 'success')
    } else {
      showToast(`✗ ${result.error}`, 'error')
    }
  }

  return (
    <div className="page-container">
      <SEO
        title="PDF Birleştir — Ücretsiz Online PDF Merge"
        description="Birden fazla PDF dosyasını tek belgede birleştir. Ücretsiz, kayıt gerektirmez, dosyalar sunucuya yüklenmez. Hızlı ve güvenli PDF merge aracı."
        canonical="/merge"
        schema={schema}
      />

      {/* ── Sayfa Başlığı ── */}
      <header className="page-header">
        <h1>PDF Birleştir</h1>
        <p>Birden fazla PDF dosyasını tek bir belgede birleştirin — ücretsiz, sunucu gerektirmez.</p>
      </header>

      {/* ── Araç ── */}
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20V4M4 12l8-8 8 8" />
          </svg>
          PDF Birleştir
        </button>
      </div>

      {/* ── Nasıl Çalışır ── */}
      <section className="how-section">
        <div className="how-inner">
          <h2>Nasıl PDF Birleştirilir?</h2>
          <ol className="how-steps">
            <li className="how-step">
              <span className="how-num">1</span>
              <div>
                <h3>PDF Dosyalarını Ekleyin</h3>
                <p>Birleştirmek istediğiniz tüm PDF dosyalarını sürükle-bırak ile ekleyin. Sıralamaya dikkat edin; belgeler ekleme sırasına göre birleştirilir.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">2</span>
              <div>
                <h3>Dosyaları Kontrol Edin</h3>
                <p>Eklenen dosyaların listesini kontrol edin. İstemediğiniz dosyayı listeden kaldırabilirsiniz.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">3</span>
              <div>
                <h3>Birleştir ve İndir</h3>
                <p>"PDF Birleştir" butonuna tıklayın. İşlem anında tamamlanır ve merged.pdf otomatik olarak indirilir.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="faq-section">
        <div className="faq-inner">
          <h2>Sık Sorulan Sorular</h2>
          <div className="faq-list">
            {[
              { q: 'PDF birleştirme ücretsiz mi?', a: 'Evet. PDFEdit\'te PDF birleştirme tamamen ücretsizdir. Kayıt veya ödeme gerekmez.' },
              { q: 'Kaç PDF dosyasını birleştirebilirim?', a: 'Sınırsız sayıda PDF ekleyebilirsiniz. Tarayıcı belleğinizle sınırlıdır; genellikle onlarca dosyayı sorunsuz birleştirir.' },
              { q: 'Dosya sırası önemli mi?', a: 'Evet. PDF\'ler listeye eklediğiniz sırayla birleştirilir. Farklı sıra için dosyaları farklı sırayla ekleyin.' },
              { q: 'Birleştirdiğim dosya sunucuya yükleniyor mu?', a: 'Hayır. Tüm işlem tarayıcınızda gerçekleşir. Dosyalarınız asla sunucuya gönderilmez, gizliliğiniz korunur.' },
              { q: 'Çıktı dosyasının adı ne olur?', a: '"merged.pdf" adıyla otomatik olarak bilgisayarınıza indirilir.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{q}</summary>
                <p className="faq-a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diğer Araçlar ── */}
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