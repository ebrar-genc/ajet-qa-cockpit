# Test Case Konvansiyonları

AJETPSSD'deki `Automated` testlerin gerçek adlandırmasından çıkarıldı (600 örnek).
Yeni case yazarken bunlara uy — ekip JQL'leri ve raporlar bu desenlere dayanıyor.

## Özet (summary) formatı

Boru işareti (`|`) ile ayrılmış, kabadan ince detaya:

```
<Modül> | <Rota/Tip> | <Varyant> | <Açıklama>
```

Gerçek örnekler:

```
Payment | DOM OW | Direct | 1 ADT | TRY | Pay with BKM Express
Booking | Additional Services | Sport Equipment Journey
MyTrips | Refund | Login : INT-RT-Flex | 1ADLT(with TC Id) | Currency(EURO)
Campaigns | Campaigns Sign In
```

### API testleri farklı kalıp kullanır

```
<HTTP_METODU> | <endpointAdı> | <senaryo açıklaması>
```

```
POST | getSeatMap | 1 Adult and 1 Infant
POST | assignSeat | Basic Package - USD Currency
```

API testleri AJETPSSD'deki `Automated` case'lerin yarısından fazlası (329/600).

## Modül adları (ilk bölüm)

`Booking` · `MyTrips` · `Check-in` · `Login` · `Standalone` · `MyInfo` · `Payment` ·
`Validations` · `Campaigns` · `Availability` · `Feedback Form` · `Baggage Tracking` ·
`Flex Offer` · `Home Page` · `Miles&Smiles`

`Standalone` ayrıca alt biçimlerde geçer: `Standalone Seat Selection`,
`Standalone Baggage Selection`, `Standalone CIP`.

## Kısaltmalar

| Kısaltma | Anlamı | Kullanım |
|---|---|---|
| `OW` / `RT` / `MC` | One Way / Round Trip / Multi City | 144 / 77 |
| `DOM` / `INT` | Domestic / International | 48 / 36 |
| `ADT` / `CHD` / `INF` | Adult / Child / Infant | 46 / 14 / 15 |
| `PNR` | Rezervasyon kodu | 29 |
| `Flex` | Flex tarife paketi | 34 |
| `TRY` `EUR` `USD` `EGP` | Para birimi | ISO kodu |

## Bilinen tutarsızlıklar — yeni case'de doğrusunu kullan

Mevcut veride iki yazım da var; **sol taraftakini** tercih et:

| Tercih et | Kaçın | Not |
|---|---|---|
| `MyTrips` | `My Trips` | 23'e 23 — ikisi de yaygın, ekip kararı gerekiyor |
| `ADT` | `ADLT` | `ADT` IATA standardı (46'ya 23) |
| `EUR` | `EURO` | ISO 4217 kodu (10'a 1) |

Özetin başına **issue key yazma**. Veride `AJPSST-4620 : POST | assignSeat | ...` gibi
kirlenmiş kayıtlar var; bu bir kopyalama hatası, kalıp değil.

## Zorunlu alanlar

Yeni bir `Test` issue'ı açarken şunlar dolmalı:

| Alan | Değer |
|---|---|
| `Test Type` | `Cucumber` (otomasyon) veya `Manual` |
| `Cucumber Test Type` | `Scenario` veya `Scenario Outline` — sadece Cucumber ise |
| `Channel` | `WEB-Desktop` · `Responsive-IOS` · `Mobil-Android` · `Mobil-IOS` · `API-Web` · `API-Mobil` |
| `Modul / Sub Modul` | Yukarıdaki modül listesinden |

`node scripts/jira.mjs create --project AJETPSSD --type Test --summary "..." --field.testType Cucumber --field.channel WEB-Desktop --dry-run`

## Gherkin yazım kuralları

- Senaryo başlığı = issue özeti ile **aynı** olsun (Xray export'u ikisini eşleştirir).
- Sadece `docs/step-library.md`'deki step'leri kullan.
- Veri tablosu kullan, step'e gömme:
  ```gherkin
  And I search for flights by datatable on Booking Page
    | tripType | ports   | dayToFlights | passengers |
    | RT       | BER,SAW | 5,10         | ADULT:1    |
  ```
- Her senaryo `Given Cookies added successfully` veya `Given I accept all the cookies`
  ile başlar (UI kanallarında 448 kullanım).

## Statü akışı — ne zaman hangisi

| Statü | Ne zaman |
|---|---|
| `Waiting For BDD` | Case açıldı, Gherkin henüz yok |
| `BDD Review` | Gherkin yazıldı, inceleme bekliyor |
| `Non Automated` | Manuel koşulacak, otomasyon planlanmıyor |
| `Automated` | Otomasyon çalışıyor ve geçiyor |
| `Automation Review` | Otomasyon kodu code review'da |
| `Update Pending` | Ürün değişti, case güncellenmeli |

## Koşum notu ve kanıt isimlendirme

### Koşum yorumu (comment)

Tek satır, kısa. Kalıp:

```
PNR: <PNR> - <SOYAD> / <kanal, login|non-login, parkur tipi, yolcu tipleri, brand> . <sonuç>
```

Örnek:

```
PNR: 3Z95RM - GENC / iOS, non-login, INT RT, 1 ADT + 1 CHD, FLEX . Yükseltme başarılı, 1.240 TL
```

Uzun koşum notu (ortam, adım adım gözlem) `jira.mjs note` ile ayrı yazılır.
Mevcut koşumlarda şu kısa blok da kullanılıyor:

```
Pnr: <PNR>
Surname: <soyad>
Test status: PASS
```

### Kanıt (evidence) dosya adı

Sıra numarası + ekranın adı, küçük harf, alt çizgi:

```
1_yolcu_secimi.jpg
2_koltuk_secimi.jpg
3_odeme.jpg
4_rezervasyon_tamam.jpg
```

Kanıta **sadece akışı kanıtlayan** ekranları koy. Şunları atla:

- Aynı ekranın tekrarı
- Aktivasyon kodu ekranı
- Onay pop-up'ı ve çerez bildirimi
