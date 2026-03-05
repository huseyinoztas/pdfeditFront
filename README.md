# Yerel PDF Araçları (PDF Toolkit)

Bu proje, tamamen gizlilik odaklı, tüm işlemleri kendi bilgisayarınızda (local) yapan bir PDF düzenleme aracıdır. Dosyalarınız hiçbir buluta veya uzak sunucuya yüklenmez.

## 🚀 Özellikler
- **PDF Birleştirme (Merge):** Birden fazla dosyayı tek bir PDF'de birleştirin.
- **PDF Bölme (Split):** PDF'in her sayfasını ayrı bir dosya yapın (ZIP olarak iner).
- **Sayfa Ayıklama (Extract):** Sadece ihtiyacınız olan sayfaları seçip yeni bir PDF yapın.
- **Sayfa Döndürme (Rotate):** Yanlış yönde olan sayfaları 90°, 180° veya 270° döndürün.

---

## 🛠 Kurulum (İlk Sefer İçin)

Arkadaşınıza gönderdiğinizde, onun kendi bilgisayarında Python yüklü olmalıdır. Ardından şu adımları izlemelidir:

1.  **Terminali/Komut Satırını Açın.**
2.  `backend` klasörüne gidin:
    ```bash
    cd "PDF Editor/backend"
    ```
3.  **Sanal Ortam Oluşturun (Sadece bir kez):**
    ```bash
    python3 -m venv venv
    ```
4.  **Sanal Ortamı Aktif Edin:**
    - macOS / Linux: `source venv/bin/activate`
    - Windows: `venv\Scripts\activate`
5.  **Kütüphaneleri Yükleyin:**
    ```bash
    pip install -r requirements.txt
    ```

---

## 🏃‍♂️ Uygulamayı Çalıştırma

Kurulum yapıldıktan sonra uygulamayı her başlattığınızda:

1.  `backend` klasöründe terminali açın.
2.  Sanal ortamı aktif edin:
    ```bash
    source venv/bin/activate
    ```
3.  Sunucuyu başlatın:
    ```bash
    python main.py
    ```
4.  Tarayıcınızda şu adresi açın:
    **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 📁 Dosya Yapısı
- `backend/`: FastAPI ile yazılmış Python sunucusu ve PDF işleme motoru.
- `frontend/`: HTML, CSS ve JavaScript (tüm arayüz).

---
**Gizlilik Notu:** Bu uygulama hiçbir veri paylaşımı yapmaz. İnternetiniz kapalıyken bile çalışır.
