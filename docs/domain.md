# Domain Sözlüğü — AJet Booking & Payment

**Yaşayan doküman.** Her oturumda yeni bir iş kuralı öğrenildiğinde buraya eklenir.
Kaynak belirt: hangi story, hangi test, hangi bug.

## Nasıl kullanılır

Bir davranışın **bug mu iş kuralı mı** olduğuna karar verirken önce buraya bak.
Burada yoksa `node scripts/jira.mjs story <KEY>` ile kabul kriterine git, sonucu buraya yaz.

---

## Ana akış — Booking

```
Home → Availability (uçuş seçimi) → Passenger & Contact Information
     → Seat Selection → Additional Services → Payment Summary → Payment (PGW) → Thank You
```

Step kütüphanesindeki sayfa adları bu akışı birebir izler. Her adım atlanabilir mi,
zorunlu mu — `Seat Selection` ve `Additional Services` **atlanabilir**
(`I click skip button on Seat Selection Page` step'i mevcut).

## Modüller

| Modül | Kapsam |
|---|---|
| `Booking` | Yeni rezervasyon oluşturma akışı |
| `MyTrips` | Mevcut rezervasyon: değişiklik, iptal, iade (refund) |
| `Check-in` | Online check-in |
| `Login` | Üyelik girişi, Miles&Smiles ile giriş |
| `MyInfo` | Üye profil yönetimi |
| `Standalone` | Rezervasyon sonrası tekil satın alımlar (koltuk, bagaj, CIP, yemek) |
| `Payment` | Ödeme yöntemleri ve PGW entegrasyonları |
| `Campaigns` | Kampanya sayfaları |
| `Flex Offer` | Flex tarife yükseltme teklifi |
| `Baggage Tracking` | Bagaj takip |

## Ödeme yöntemleri (testlerde görülenler)

`Klarna` · `BKM Express` — PGW sayfası ayrı bir adım (`Ajet PGW Page`), ülke seçimi
ve `CONFIRM_PAYMENT` butonu içeriyor. Klarna akışı Almanya/EURO ile test ediliyor.

## Yolcu tipleri ve rota kodları

- `ADT` (veri tabanında `ADLT` de geçer) yetişkin · `CHD` çocuk · `INF` (`INFT`) bebek
- `STDT` öğrenci · `SLDD` asker · `DSB` engelli · `Gazi` gazi · `TCHR` öğretmen
- İndirimli tipler (`DSB`, `SLDD`, `Gazi`) üyelik doğrulaması ister — aşağıdaki kurala bak.
- `OW` tek yön · `RT` gidiş-dönüş · `MC` çok şehirli
- `DOM` yurt içi · `INT` yurt dışı
- Tarife paketi: `Flex` (ve muhtemelen EcoFly/ExtraFly/PrimeFly aileleri — **doğrulanmadı**)

## Test ortamı notları

- `Has been created by TDFA` — test verisi üretim aracı (422 kullanım). PNR/rezervasyon
  üretimi bunun üzerinden yapılıyor.
- API testleri mock kullanıyor: `Mock Availability Request`, `Mock CreateBooking Request`.

---

## Açık sorular — doğrulanmadı

Bunları öğrendikçe cevapla ve yukarı taşı:

1. **Kanal ayrımı:** `Mobil-Android` / `Mobil-IOS` native uygulama mı, yoksa mobil web mi?
   `Responsive-IOS` ayrı bir değer olarak var — muhtemelen responsive web o, native ayrı.
   Mobil web manuel koşumun hangi kanala yazılmalı, netleştir.
2. **`Bug` vs `Defect`:** AJETPSSD'de iki ayrı issue tipi var. Hangisi ne zaman açılıyor?
3. **`MyTrips` vs `My Trips`** yazımında ekip kararı hangisi?
4. Tarife paketi aile isimleri (EcoFly / ExtraFly / PrimeFly) AJet'te geçerli mi?

## Öğrenilen iş kuralları

> Buraya ekle. Format:
>
> ### <Kural başlığı>
> **Kaynak:** DIJITALTP-xxxxx / AJETPSSD-xxxxx
> **Kural:** ...
> **Test edilişi:** ...

### Bebek (INFANT) Miles&Smiles üyesi olamaz
**Kaynak:** AJETPSSD-29948 @ AJETPSSD-48612 koşumu (2026-11-12, prep, iOS v16.1, PNR 3Z959L)
**Kural:** 0-2 yaş bebek yolcuya Miles&Smiles numarası eklenemez. Yolcu bilgileri
formunda MS alanı bebek için hiç gelmez; rezervasyon sonrası "Yolcu bilgileri /
Miles&Smiles" listesinde bebek satırı TK numarasız görünür.
**Test edilişi:** 7 yolcu tipli rezervasyonda bebek dışındaki tiplere MS eklenir,
bebekte alanın **bulunmadığı** doğrulanır. "Tüm yolculara MS eklendi" beklentisi
yazan senaryolar bebeği kapsam dışı bırakmalı.

### Öğretmen / Öğrenci, MS senaryolarının kapsamı dışında
**Kaynak:** AJETPSSD-29948 koşumu (2026-11-12) — ekip kararı
**Kural:** Non-login MS akışında test edilen yolcu tipleri: ADULT, CHILD, INFANT,
DISABLED, VETERAN. STUDENT ve TEACHER bu akışın kapsamında değil.
**Test edilişi:** Bu tipleri içeren eski datatable'lar bakım istiyor — AJETPSSD-29948
örneğinde senaryo hâlâ 7 tip sayıyor, gerçek kapsam 5.

### Üyelik doğrulaması isteyen yolcu tipleri
**Kaynak:** AJETPSSD-29948 koşumu, yolcu seçimi ekranı (iOS v16.1)
**Kural:** Engelli yolcu tipi seçilirken *"Seçili yolcu tipinin AJet üyeliği üzerinden
doğrulanması gerekmektedir"* uyarısı çıkıyor. Yolcu bilgileri doldurulduğunda
*"Üye bilgileri doğrulanmıştır"* onayı veriliyor.
**Test edilişi:** İndirimli yolcu tiplerinde bu doğrulama adımını atlamayın; onay
mesajının görünmesi akışın parçası.

### Engelli yolcu online koltuk seçemez
**Kaynak:** AJETPSSD-48581 @ AJETPSSD-48612 koşumu (2026-11-12, prep, iOS v16.1, PNR 3Z95F6)
**Kural:** Engelli yolcu tipi koltuk seçimi ekranında koltuk seçemez. Uygulama şu uyarıyı
basar: *"Passengers with disabilities cannot select a seat online and can do so at the
check-in counter."* Aynı rezervasyondaki yetişkin koltuk seçebilir.
**Test edilişi:** Engelli yolcu içeren senaryolarda bu uyarıyı bekle. Koltuk seçilememesi
bug değildir.

### Paket yükseltme — Uçuşlarım akışı
**Kaynak:** AJETPSSD-48581 koşumu (2026-11-12)
**Kural:** Rezervasyon sonrası paket yükseltme Uçuşlarım > Uçuş detayı > *Upgrade package*
ile yapılır. Yükseltme sayfası uçuş kartında mevcut paketi ve hedef paketi yan yana
gösterir (FLEX → PREMIUM). Yükseltme sonrası uçuş detayındaki paket rozeti yeni pakete
döner. Paket aileleri **doğrulandı**: Flex ve Premium AJet'te geçerli.
**Test edilişi:** Yükseltme öncesi ve sonrası uçuş detayı ekranını kanıt olarak al.

### Non-login PNR işlemleri — paket yükseltme dahil — aktivasyon koduna bağlı
**Kaynak:** AJETPSSD-49754 (2026-11-18, preprod web, PNR 3Z9G64) — ekip kararı (Ebrar, 18.11.2026).
Önceki karar (AJETPSSD-49219, 13.11.2026: "web doğru, buton kodsuz görünmeli") **geçersiz**.
**Kural:** Uçuşlarım'da PNR + soyad ile (misafir) sorgulanan rezervasyonda yanıt
`isActivatedByOTP: false` döner ve `allowedActions` alanları null gelir. Bu durumda
**hiçbir işlem butonu görünmez — "Paketinizi yükseltin" dahil.** Aktivasyon kodu onaylanınca
butonlar gelir. `bundleUpgradeAvailable: true` gelse bile kodsuz durumda buton gizli olmalı.
iOS bu kurala uyuyor. Web 18.11.2026'da uymuyor: buton görünüyor ve Paket seçimi sayfası
açılıyor → AJETPSSD-49754.
**Test edilişi:** Misafir sorgusunda önce `isActivatedByOTP` değerine bak. `false` ise
yükseltme butonunun **olmadığını** doğrula. Kodu girip butonun geldiğini ayrıca doğrula.

### Aktarmalı yolculukta paket tek, yükseltme tüm segmentleri kapsar
**Kaynak:** AJETPSSD-48586 koşumu (2026-11-13, PNR 3Z95RM) + 48581/48586 beklenen sonucu
**Kural:** Aktarmalı (`isConnected: true`, `flightType: INDIRECT`) yolculuk myFlightsInfo'da
**tek flight nesnesi** olarak döner. `brandInfo` ve `bundleUpgradeAvailable` uçuş
seviyesindedir, segment seviyesinde değil. Bu yüzden 1. segmenti yükseltmek tüm
yolculuğu yükseltir. Bacakları ayrı paketlemek mümkün değildir.
**Test edilişi:** Testin beklenen sonucu da "tek ModifyBundle ile tüm segmentler
gönderilir" diyor. İki segmentin birlikte yükselmesi bug değildir. Yükseltme sonrası
her iki segmentin de yeni paketi gösterdiğini doğrula.

### Online check-in: engelli yolcu bankoya yönlendirilir, bebek yetişkinle birlikte alınır
**Kaynak:** AJETPSSD-48244 @ AJETPSSD-48612 koşumu (2026-11-13, prep, iOS v16.1, PNR 3Z95S9)
**Kural:** Yolcu seçimi ekranında engelli (DISB) yolcu satırı **pasif** gelir ve şu uyarı
çıkar: *"It looks like you might need special assistance for your reservation. Please
proceed to our check-in desks at the airport to complete your check-in process."*
Adult, Veteran ve Child seçilebilir. Bebek (INFT) listede ayrı satır olarak görünmez;
yetişkinle birlikte check-in olur, biniş kartı oluşur, koltuk numarası boştur.
**Test edilişi:** İzinli/izinsiz tip senaryosunda PNR'a en az bir DISB koy. Uyarının
çıktığını ve kalan yolcularla akışın tamamlandığını doğrula. Bebeğin biniş kartını
kontrol et. Bkz. engelli yolcunun online koltuk seçememesi kuralı.

### Promosyon kodu alanı DSB ve SLDD yolcularında gizli
**Kaynak:** Bug 23628 (VS Code Copilot prompt'undan aktarıldı, 2026-11-13)
**Kural:** Engelli (DSB) ve asker (SLDD) yolcu tiplerinde promosyon kodu alanı
ekranda gelmez. Alanın yokluğu bug değildir.
**Test edilişi:** Promo kodu senaryolarını yetişkin veya standart tiplerle koş.
İndirimli tipli rezervasyonda alanı arama.

### SSRPROMREG — SSR'lara %25 indirim, iki yerde görünür
**Kaynak:** VS Code Copilot prompt'u, ekip tarafından kabul edildi
**Kural:** `SSRPROMREG` promosyonu ek hizmetlere (SSR) %25 indirim uygular. İndirim
hem kalem satırlarında düşük tutar olarak, hem de ayrı bir "İndirimler" satırında
görünür. Bu çift gösterim kabul edilmiştir.
**Test edilişi:** Tutarı iki kez düşmüş sayma. Kalem toplamı ile "İndirimler"
satırını birlikte doğrula.

### Para birimi — takvim ile uçuş listesi farklı seçenek gösterir
**Kaynak:** VS Code Copilot prompt'u — **doğrulanmadı**
**Kural (şüpheli):** Takvimde para birimi uçuşa göre gelir (TL veya EUR). Uçuş
listesinde TL, USD ve EUR seçenekleri birlikte gelir. Bu bir iş kuralı olabilir.
**Test edilişi:** Bu farkı gördüğünde **bug açma**. Önce kullanıcıya veya ürün
sahibine sor.

### Kampanyalar — ekran adları ve geri sayım modülü
**Kaynak:** Story 47577, Bug 49265 koşumu (16.11.2026), senaryo 30406
**Kural:** Mobil uygulamada kampanya üç yerde görünür: Anasayfa ("Kampanya ve
Duyurular" alanı), Kampanyalar sekmesi, Kampanya Detayı. Kampanyalar sekmesi iki
bölüm taşır: **Güncel Kampanyalar** ve **Geçmiş Kampanyalar**. Geçmiş kampanya kartı
soluk gelir ve detay sayfasını **açmaz**.
Geri sayım modülü kampanyanın bitmesine kalan süreyi gün, saat ve dakika olarak
gösterir. Saniye göstermez. Sadece güncel kampanyada görünür. Saatler CMS'e TR saati
(GMT+3) girilir. Anasayfa `MOBILEHOMECAROUSELSERVICE`, kampanyalar listesi
`MOBILEACTIVE&EXPIREDCAMPAIGNS` servisinden beslenir.
**Sayaç kampanya detay sayfasında gösterilmez.** Sadece anasayfa ve kampanyalar
sayfasında bulunur. Story 47577 AC6 ve bug 49265 açıklaması bunun tersini söyler;
geçerli kural budur (Ebrar, 16.11.2026). iOS doğru davranır, Android modülü detayda
gösterir — bulgu AJETPSSD-49358. Bu kuralı yazılı teyide bağlamak gerekir.
**Listeleme kuralı:** Aktif + tarih null/null → Güncel. Aktif + başlangıç geçmiş,
bitiş gelecek → Güncel. Aktif + ikisi de geçmiş → Geçmiş. Pasif → görünmez.
**Test edilişi:** Her kombinasyon için CMS'te ayrı kampanya gerekir. Sayacı üç ekranda
birlikte oku; anasayfa farklı servisten geldiği için sapma riski oradadır. Geçmiş
kampanyada detay sayacı test edilemez — kart açılmaz.
**Gözlem (Android preprod, 19.11.2026):** Kampanya detay WebView'i kampanyaya göre
`web-uat` veya `web-preprod` host'una gider. Host CMS içeriğinden gelir. Bu ağdan iki host
da Akamai "Access Denied" döner; detay içeriği cihazdan test edilemez.
**Anasayfa karuseli CMS'ten yönetilir.** Kampanyalar sekmesinde "Geçmiş" görünen bir
kampanya anasayfada güncel kart olarak görünebilir. Bu bug değildir (Ebrar, 19.11.2026).

### Yolcu seçimi kuralları (mobil booking)
**Kaynak:** Android preprod koşumu (19.11.2026), AJETPSSD-5117 AC5, DIJITALTP-101647
**Kural:** Bebek hariç en fazla 9 yolcu seçilir. Bebek sayısı refakatçi sayısını geçemez.
Refakatçi sayılan tipler: Yetişkin, Öğretmen, Öğrenci, Engelli, Gazi. Özel tip + bebek
geçerlidir (AC5). 0 yetişkin + 1 öğrenci + 1 bebek kabul edilir; 18+ refakatçi kontrolü
yolcu bilgileri sayfasında yapılır. Refakatçi düşürülünce bebek refakatsiz kalıyorsa
"−" işlemi engellenir ve uyarı çıkar.
**Gidiş-dönüş:** Dönüş tarihi seçilmeden onaylanırsa arama "Tek yön"e döner. Bug değil.
**Rota:** Kalkış, varışla aynı seçilirse varış temizlenir ve liste yeniden açılır.

### Web v16.1 yeni sayfa adresleri ve preprod gözlemleri
**Kaynak:** AJETPSSD-41125 etki notları + AJETPSSD-47968 koşumu (19-20.11.2026, preprod web)
**Kural:** Yeni Tur ve Aktivite sayfası `/tr/tur-ve-aktivite`; Uçak İçi İnternet `/tr/hizmetlerimiz/ucak-ici-internet`.
Preprod'da Hizmetler menüsü ikisinde de eski sayfaya gidiyor (CMS menü bağlantısı).
Check-in adım adresi dil öneksizdir: `/checkin/flightselection`. `/tr/checkin/...` 404 verir.
Preprod dil seçicide yalnız TR ve EN var; DE/FR senaryoları preprod'da koşulamaz.
**Test edilişi:** Ağ kontrolünde `performance.getEntriesByType('resource')` kullan; Chrome ağ aracı sayfa geçişinde kaydı siler.
Arabellek dolar: aramadan önce `performance.setResourceTimingBufferSize(5000)` çalıştır.
