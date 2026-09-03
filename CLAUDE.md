# Proje: Ahmet Can Özdemir — Kişisel Portfolyo Sitesi

## Amaç
Bu proje, TUSAŞ'ta Senior Data Analyst olarak çalışan Ahmet Can Özdemir'in ("Acoz") kariyer geçişi
sürecini desteklemek için hazırlanan bir portfolyo web sitesidir. Site:
- CV/başvuru sürecinde işverenlere gönderilecek/paylaşılacak profesyonel bir referans noktası olacak,
- Data/BI Analyst ve Product Analyst rollerine geçiş hedefini destekleyecek,
- İleride başka side project'lerin (örn. Garmin/Strava verisiyle spor koçluğu projesi) sergileneceği bir zemin olacak.

Hedef kitle: teknoloji, e-ticaret, bankacılık/fintek sektörlerindeki işe alım uzmanları ve hiring manager'lar
(çoğunlukla İngilizce okuyacaklar — site içeriği İngilizce olmalı).

## Çalışma Modeli (ÖNEMLİ)
Claude bu projede geliştirici + tasarımcı + proje yöneticisi rolünü üstlenir:
- İşin büyük kısmını (kod, içerik taslağı, yapı kararları) Claude fiilen yapar.
- **Karar noktası kullanıcıdır.** Geri dönüşü zor, zevk/tercih meselesi olan veya birden fazla makul
  yol olan konularda (tasarım yönü, içerik tonu, hangi projelerin öne çıkarılacağı, üçüncü parti
  servis seçimi vb.) Claude seçenekleri kısa gerekçeleriyle sunar ve onay bekler.
- Saf teknik "nasıl" kararlarında (klasör yapısı, kütüphane detayları, refactor vb.) Claude kendi
  kararını verip sonucu raporlar; kullanıcı itiraz ederse değiştirir.
- Claude asla sessizce büyük yön değişikliği yapmaz — ilerlemeyi düzenli olarak özetler.

## Teknoloji Kararları
- **Framework:** Next.js (App Router, TypeScript)
- **Stil:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** `acozdemir.com` — müsaitliği doğrulandı (Namecheap üzerinden ~$10-15/yıl civarı, ilk yıl promosyonlu olabilir). Henüz satın alınmadı.
- **Blog/yazı bölümü:** İlk sürümde YOK (kapsam dışı bırakıldı, ileride eklenebilir)

## Site Yapısı (v1 kapsamı)
- **Hakkımda / About:** Industrial Engineering geçmişi, TUSAŞ'taki Digital Transformation → Data
  Analyst / Senior Data Analyst yolculuğu, Erasmus (Duisburg-Essen) ve ABD Work & Travel deneyimi
- **Projeler / Projects:** BI/data analiz çalışmaları (isim verilemeyecek kurumsal detaylar
  genelleştirilerek anlatılmalı), bu portfolyo sitesinin kendisi, ileride eklenecek diğer side project'ler
- **CV / Deneyim:** İndirilebilir CV + web üzerinde özet deneyim zaman çizelgesi
- **İletişim:** LinkedIn, e-posta, (varsa) GitHub bağlantısı

> Not: İçerik metinleri hazırlanırken kariyer geçişi anlatısına dikkat edilmeli — savunma/havacılık
> sektöründen teknoloji sektörüne geçiş isteği pozitif ve ileriye dönük bir çerçevede sunulmalı.

## Marka / Tasarım Kimliği
- Ton: profesyonel ama samimi — kurumsal/soğuk değil, kişisel ama özensiz de değil
- Sadelik önceliklidir: bu bir sanat portfolyosu değil, iş başvurusu materyali. "Az ama öz" tercih edilir
- Tek tema kullanılacak, dark mode YOK
- **Renk paleti (karar verildi):** Sıcak nötr zemin + petrol mavisi vurgu
  - Zemin: `#FAF9F6` (kırık beyaz / krem)
  - Ana metin: `#2D2A26` (sıcak antrasit)
  - İkincil metin: `#87817A`
  - Vurgu (butonlar, linkler): `#2C6E8E` (petrol mavisi)
  - Alternatif vurgu (istenirse denenebilir): `#0F766E` (koyu teal)
- Referans ilham sitesi: joaofcalmeida.pt — sabit üst menü, sayılarla özet bant, zaman çizelgesi
  formatında deneyim, kart/grid projeler bölümü gibi yapısal fikirler oradan alındı (akademik
  "publications" gibi kısımlar hariç, kullanıcının profiline uyarlanacak)

## SEO ve Paylaşım
- Her sayfada temel meta etiketler (title, description) bulunmalı
- Open Graph (OG) görseli ve başlığı ayarlanmalı — site LinkedIn/CV üzerinden paylaşılınca düzgün bir
  önizleme kartı çıkması hedeflenir
- Basit bir `sitemap.xml` ve `robots.txt` yeterlidir; ileri SEO çalışması (anahtar kelime optimizasyonu vb.) kapsam dışı

## Git / GitHub İş Akışı
- Kullanıcının GitHub deneyimi yok — akış olabildiğince sade tutulmalı
- Başlangıçta tek branch (`main`) üzerinden ilerlenebilir; özellik bazlı branch'lere yalnızca proje
  büyüdükçe geçilir
- Commit mesajları kısa ve açıklayıcı olmalı (örn. `feat: hero bölümü eklendi`, `fix: mobilde menü hizası`)
- Her anlamlı adımdan sonra commit atılmalı ki kullanıcı GitHub geçmişinden projenin gelişimini takip edebilsin

## Performans ve Erişilebilirlik
- Görseller optimize edilmeli (Next.js `<Image>` bileşeni kullanılmalı)
- Temel a11y kuralları: yeterli renk kontrastı, görsellerde `alt` metni, klavye ile gezilebilirlik
- Ağır bir "Lighthouse skoru 100 olsun" baskısı yok; amaç makul hız ve herkesin siteyi rahat kullanabilmesi
- Analytics eklenmiyor (v1 kapsamı dışı)

## Kod Standartları
- TypeScript strict mode
- Bileşenler küçük ve tek sorumluluklu tutulmalı
- Erişilebilirlik (a11y) ve mobil uyumluluk göz ardı edilmemeli
- Commit mesajları açıklayıcı olmalı (Ahmet GitHub konusunda yeni — sade ve öğretici bir akış tercih edilmeli)

## Proje Takibi
Görevler Todoist'te **"Side Projects" → "Portfolyo Sitesi"** bölümünde tutulur. Yeni bir aşamaya
geçildiğinde veya kapsam değiştiğinde Todoist görevleri güncellenmeli/eklenmelidir.

## Claude'un Bilmesi Gereken Bağlam
- Kullanıcı aktif olarak iş arıyor; bu site iş başvuru sürecine paralel yürütülen bir side project.
- Kullanıcının GitHub deneyimi yok — açıklamalar bu varsayımla yapılmalı.
- Nihai hedef: sektör değişikliği (savunma/üretimden teknolojiye), remote öncelikli.
