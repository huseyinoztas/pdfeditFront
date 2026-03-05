import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const BASE = 'https://pdfedit.com.tr'

const tools = [
  { path: '/merge', icon: '📄', title: 'PDF Birleştir', description: 'Birden fazla PDF dosyasını tek bir belgede birleştirin.' },
  { path: '/split', icon: '✂️', title: 'PDF Böl', description: 'PDF dosyanızı her sayfası ayrı bir dosya olacak şekilde bölün.' },
  { path: '/extract', icon: '📋', title: 'Sayfa Çıkar', description: 'Belirli sayfaları çıkararak yeni bir PDF oluşturun.' },
  { path: '/rotate', icon: '🔄', title: 'Sayfa Döndür', description: 'PDF sayfalarını 90°, 180° veya 270° döndürün.' },
  { path: '/pdf-to-jpg', icon: '🖼️', title: 'PDF to JPG', description: 'PDF sayfalarını yüksek kaliteli JPG görüntülerine dönüştürün.' },
  { path: '/jpg-to-pdf', icon: '📷', title: 'JPG to PDF', description: 'Resimlerinizi tek bir PDF belgesi haline getirin.' },
  { path: '/pdf-to-excel', icon: '📊', title: 'PDF to Excel', description: 'PDF tablolarını Excel elektronik tablosuna dönüştürün.' },
  { path: '/pdf-to-word', icon: '📝', title: 'PDF to Word', description: 'PDF içeriğini düzenlenebilir Word belgesine aktarın.' },
  { path: '/compress', icon: '📉', title: 'PDF Sıkıştır', description: 'PDF dosya boyutunu görüntü kalitesini optimize ederek azaltın.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'PDFEdit',
      description: 'Ücretsiz, yerel ve gizlilik odaklı PDF araçları.',
      inLanguage: 'tr-TR',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'PDFEdit',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: BASE,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description: '9 farklı PDF aracı: birleştir, böl, döndür, sıkıştır, JPG/Excel/Word dönüştür. Dosyalar sunucuya yüklenmez.',
      featureList: [
        'PDF Birleştir', 'PDF Böl', 'Sayfa Çıkar', 'Sayfa Döndür',
        'PDF to JPG', 'JPG to PDF', 'PDF to Excel', 'PDF to Word', 'PDF Sıkıştır',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'PDFEdit tamamen ücretsiz mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Tüm araçlar ücretsizdir. Kayıt veya ödeme gerekmez.' },
        },
        {
          '@type': 'Question',
          name: 'Dosyalarım sunucuya yükleniyor mu?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm işlemler doğrudan tarayıcınızda ve bilgisayarınızda gerçekleşir. Hiçbir dosya sunucuya gönderilmez.' },
        },
        {
          '@type': 'Question',
          name: 'Hangi PDF işlemlerini yapabilirim?',
          acceptedAnswer: { '@type': 'Answer', text: 'PDF birleştirme, bölme, sayfa çıkarma, döndürme, sıkıştırma, PDF-JPG, JPG-PDF, PDF-Excel ve PDF-Word dönüşümü yapabilirsiniz.' },
        },
        {
          '@type': 'Question',
          name: 'Dosya boyutu sınırı var mı?',
          acceptedAnswer: { '@type': 'Answer', text: 'İşlemler yerel olarak yapıldığı için boyut sınırı tarayıcınızın belleğiyle sınırlıdır. Genellikle 100 MB\'a kadar sorunsuz çalışır.' },
        },
        {
          '@type': 'Question',
          name: 'Hesap oluşturmam gerekiyor mu?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Hiçbir araç için kayıt veya giriş gerekmez. Direkt kullanabilirsiniz.' },
        },
      ],
    },
  ],
}

function Dashboard() {
  return (
    <>
      <SEO
        title="Ücretsiz PDF Araçları — Birleştir, Böl, Dönüştür"
        description="PDF birleştir, böl, döndür, sıkıştır, JPG/Excel/Word'e dönüştür. Tamamen ücretsiz, yerel çalışır — hiçbir dosya sunucuya yüklenmez."
        canonical="/"
        schema={schema}
      />

      {/* ── Hero ── */}
      <section className="hero">
        <h1>PDF araç setiniz, <span className="gradient-text">tamamen gizli</span></h1>
        <p>Tüm işlemler bilgisayarınızda gerçekleşir. Yükleme yok. Hesap yok. Bulut yok.</p>
      </section>

      {/* ── Araçlar ── */}
      <main>
        <div className="tools-grid">
          {tools.map(tool => (
            <Link key={tool.path} to={tool.path} className="tool-card">
              <div className="tool-card-icon">{tool.icon}</div>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>

      {/* ── Nasıl Çalışır ── */}
      <section className="how-section">
        <div className="how-inner">
          <h2>Nasıl Çalışır?</h2>
          <ol className="how-steps">
            <li className="how-step">
              <span className="how-num">1</span>
              <div>
                <h3>Aracı Seçin</h3>
                <p>Yukarıdan ihtiyacınıza uygun PDF aracına tıklayın — birleştirme, bölme, dönüştürme veya sıkıştırma.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">2</span>
              <div>
                <h3>Dosyanızı Yükleyin</h3>
                <p>PDF'inizi sürükle-bırak ile ekleyin veya dosya seçin. Dosyanız yalnızca tarayıcınızda işlenir, sunucuya gönderilmez.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">3</span>
              <div>
                <h3>İndirin</h3>
                <p>İşlem tamamlandığında sonuç dosyanızı anında indirin. Dosyalar saklanmaz veya paylaşılmaz.</p>
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
              { q: 'PDFEdit tamamen ücretsiz mi?', a: 'Evet. Tüm araçlar tamamen ücretsizdir. Kayıt veya ödeme gerekmez; direkt kullanmaya başlayabilirsiniz.' },
              { q: 'Dosyalarım sunucuya yükleniyor mu?', a: 'Hayır. Tüm PDF işlemleri doğrudan tarayıcınızda gerçekleşir. Dosyanız hiçbir zaman sunucuya gönderilmez; gizliliğiniz %100 korunur.' },
              { q: 'Hangi PDF işlemlerini yapabilirim?', a: 'PDF birleştirme, bölme, sayfa çıkarma, döndürme, sıkıştırma, PDF → JPG, JPG → PDF, PDF → Excel ve PDF → Word dönüşümü yapabilirsiniz.' },
              { q: 'Dosya boyutu sınırı var mı?', a: 'İşlemler yerel olarak gerçekleştiğinden boyut sınırı tarayıcınızın belleğiyle sınırlıdır. Genellikle 100 MB\'a kadar sorunsuz çalışır.' },
              { q: 'Hesap oluşturmam gerekiyor mu?', a: 'Hayır. Hiçbir araç için kayıt veya giriş gerekmez. Siteye girdiğiniz anda tüm araçları kullanabilirsiniz.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-q">{q}</summary>
                <p className="faq-a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard