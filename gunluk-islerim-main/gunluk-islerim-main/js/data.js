const allJobs = [
  {
    id: 1,
    title: "Günlük Temizlik Elemanı",
    company: "Ev Temizlik Hizmetleri",
    location: "İstanbul, Kadıköy",
    salary: "850 TL/gün",
    type: "Günlük",
    date: "Bugün",
    description: "2 kişilik ekip için deneyimli temizlik elemanı aranıyor. Daire temizliği yapılacak.",
    fullDescription: `Ev temizliği konusunda deneyimli, güvenilir ve çalışkan temizlik elemanı arıyoruz.

İş Tanımı:
• Daire genel temizliği
• Mutfak ve banyo temizliği
• Zemin silme ve cam silme
• Düzenli ve özenli çalışma

Aranan Nitelikler:
• Deneyimli olmak
• Temizlik malzemelerini kullanmayı bilmek
• Güvenilir ve çalışkan olmak
• İletişim becerileri gelişmiş olmak

Çalışma Koşulları:
• Günlük 8 saat
• Haftalık 5-6 gün
• Yemek ve yol parası ayrıca verilir
• SGK dahil`,
    contact: {
      email: "info@evtemizlik.com",
      phone: "+90 555 123 4567",
    },
  },
  {
    id: 2,
    title: "Kurye",
    company: "Hızlı Kargo A.Ş.",
    location: "Ankara, Çankaya",
    salary: "1,100 TL/gün",
    type: "Günlük",
    date: "Bugün",
    description: "Motosiklet ehliyeti olan, bölgeyi tanıyan kurye aranıyor.",
    fullDescription: `Deneyimli ve sorumluluk sahibi motosiklet kuryesi arıyoruz.

İş Tanımı:
• Paket ve evrak teslimatı
• Müşteri iletişimi
• Teslimat takibi
• Araç bakımı

Aranan Nitelikler:
• A2 veya A sınıfı ehliyet
• Ankara Çankaya bölgesini tanımak
• İletişim becerileri güçlü olmak
• Trafik kurallarına uygun sürüş

Çalışma Koşulları:
• Günlük 9 saat
• Haftada 6 gün
• Yakıt ve bakım firmadan
• Yemek kartı sağlanır`,
    contact: {
      email: "ik@hizlikargo.com",
      phone: "+90 555 234 5678",
    },
  },
  {
    id: 3,
    title: "Garson",
    company: "Cafe Restaurant",
    location: "İzmir, Alsancak",
    salary: "950 TL/gün",
    type: "Geçici",
    date: "2 gün önce",
    description: "Hafta sonu çalışabilecek deneyimli garson aranıyor.",
    fullDescription: `Hafta sonları için deneyimli ve enerjik garson arıyoruz.

İş Tanımı:
• Müşteri karşılama ve sipariş alma
• Servis yapma
• Masa düzeni ve temizliği
• Kasa işlemleri

Aranan Nitelikler:
• En az 1 yıl garsonluk deneyimi
• Hafta sonları çalışabilmek
• Temiz ve düzenli görünüm
• Müşteri odaklı yaklaşım

Çalışma Koşulları:
• Cumartesi-Pazar 10:00-22:00
• Yemek ve içecek ücretsiz
• Bahşiş ayrıca`,
    contact: {
      email: "caferestaurant@email.com",
      phone: "+90 555 345 6789",
    },
  },
  {
    id: 4,
    title: "Nakliye Yardımcısı",
    company: "Taşıma Hizmetleri",
    location: "Bursa, Nilüfer",
    salary: "900 TL/gün",
    type: "Günlük",
    date: "Bugün",
    description: "Ev eşyası taşımada yardımcı olacak 2 kişi aranıyor.",
    fullDescription: `Ev ve ofis taşımacılığı için fiziksel olarak güçlü yardımcılar arıyoruz.

İş Tanımı:
• Eşya paketleme ve taşıma
• Mobilya montaj-demontaj
• Araç yükleme-boşaltma
• Müşteri yardımı

Aranan Nitelikler:
• Fiziksel olarak güçlü olmak
• Takım çalışmasına yatkın
• Sorumluluk sahibi
• Sabırlı ve nazik

Çalışma Koşulları:
• Günlük 8-10 saat
• Haftada 5-6 gün
• Öğle yemeği verilir
• Fazla mesai ücreti ayrıca`,
    contact: {
      email: "nakliyat@tasima.com",
      phone: "+90 555 456 7890",
    },
  },
  {
    id: 5,
    title: "Bahçe İşçisi",
    company: "Yeşil Alan Bakım",
    location: "Antalya, Konyaaltı",
    salary: "750 TL/gün",
    type: "Günlük",
    date: "1 gün önce",
    description: "Bahçe düzenleme ve bakım işleri için deneyimli kişi aranıyor.",
    fullDescription: `Bahçe düzenleme ve bakım konusunda deneyimli işçi arıyoruz.

İş Tanımı:
• Çim biçme ve bakımı
• Ağaç budama
• Çiçek dikimi ve bakımı
• Sulama sistemi kontrolü

Aranan Nitelikler:
• Bahçe işlerinde deneyimli
• Alet-ekipman kullanmayı bilmek
• Fiziksel olarak uygun
• Düzenli çalışma

Çalışma Koşulları:
• Günlük 7 saat
• Mevsimsel çalışma
• Ekipman firmadan
• Güneş önlemleri sağlanır`,
    contact: {
      email: "info@yesilalan.com",
      phone: "+90 555 567 8901",
    },
  },
  {
    id: 6,
    title: "Boyacı Ustası",
    company: "Dekorasyon A.Ş.",
    location: "İstanbul, Beşiktaş",
    salary: "1,250 TL/gün",
    type: "Geçici",
    date: "Bugün",
    description: "Daire boyama işi için deneyimli boyacı ustası aranıyor.",
    fullDescription: `120 m2 daire için deneyimli boyacı ustası arıyoruz.

İş Tanımı:
• Daire iç boya
• Hazırlık işleri (macun, zımpara)
• Kaliteli iş bitirme
• Temizlik

Aranan Nitelikler:
• En az 5 yıl deneyim
• Kaliteli iş yapan
• Malzeme bilgisi olan
• Referansları olan

Çalışma Koşulları:
• Proje bazlı (3-5 gün)
• Malzeme firmadan
• Öğle yemeği verilir
• Sonrası için yeni projeler`,
    contact: {
      email: "dekorasyon@firma.com",
      phone: "+90 555 678 9012",
    },
  },
  {
    id: 7,
    title: "Elektrikçi",
    company: "Teknik Servis",
    location: "İzmir, Karşıyaka",
    salary: "1,150 TL/gün",
    type: "Günlük",
    date: "3 gün önce",
    description: "Ev ve işyeri elektrik tesisatı için deneyimli elektrikçi.",
    fullDescription: `Ev ve işyeri elektrik işleri için deneyimli elektrikçi arıyoruz.

İş Tanımı:
• Elektrik tesisat ve onarım
• Pano montajı
• Aydınlatma sistemleri
• Arıza tespiti ve giderme

Aranan Nitelikler:
• Elektrik belgesi olan
• En az 3 yıl deneyim
• Ölçüm aletlerini kullanabilen
• İş güvenliğine dikkat eden

Çalışma Koşulları:
• Günlük veya proje bazlı
• Malzeme müşteriden
• Sigortalı çalışma
• Hafta sonları bonus`,
    contact: {
      email: "elektrik@teknikservis.com",
      phone: "+90 555 789 0123",
    },
  },
  {
    id: 8,
    title: "Aşçı Yardımcısı",
    company: "Restoran Zinciri",
    location: "Ankara, Kızılay",
    salary: "800 TL/gün",
    type: "Günlük",
    date: "Bugün",
    description: "Mutfak işlerinde yardımcı olacak çalışkan kişi aranıyor.",
    fullDescription: `Yoğun restoranımız için mutfak yardımcısı arıyoruz.

İş Tanımı:
• Malzeme hazırlama
• Sebze-meyve doğrama
• Mutfak temizliği
• Aşçılara yardım

Aranan Nitelikler:
• Temiz ve düzenli
• Hızlı çalışabilen
• Hijyen kurallarına uyan
• Takım çalışmasına uygun

Çalışma Koşulları:
• Günlük 10 saat
• Split vardiya
• Yemek ücretsiz
• SGK dahil`,
    contact: {
      email: "mutfak@restoran.com",
      phone: "+90 555 890 1234",
    },
  },
];
