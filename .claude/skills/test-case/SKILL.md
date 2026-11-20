---
name: test-case
description: Create or update Xray Test issues in AJETPSSD - functional (manual) test cases by default, with correct metadata, story links and test set/execution bookkeeping. Use when the user wants to write scenarios for a story, add a new test case, update an existing one, work through the Update Pending queue, or fix test case metadata.
---

# Test case yazma ve güncelleme

Xray `Test` issue'larını açar ve günceller.

## Varsayılan: fonksiyonel case

Aksi istenmedikçe **fonksiyonel test case** yaz. Gherkin yazma.

- `Test Type` = `Manual`, `TestRunType` = `Manuel`
- Adımlar Xray manuel adım alanına gider, numaralı ve Türkçe
- `Description` tek düz Türkçe cümledir. Doğal dil kullan. Başlık, madde ve HTML koyma

Kullanıcı açıkça Gherkin isterse `bdd-author` skill'ine geç.

## Önce oku

- `docs/test-writing-rules.md` - yazım standardı, alan değerleri, checklist
- `docs/conventions.md` - modül adları, kısaltmalar, koşum notu kalıbı
- `docs/jira-map.md` - alan id'leri ve statüler

## Kaç senaryo yazılır

Senaryo sayısı story'nin kapsamına ve zorluğuna göre şekillenir. Sabit sayı yoktur.
İlke: **az senaryo, yüksek kapsam.**

Birleştir:

- Kontroller aynı ekranda ve ucuzsa tek senaryoda topla. Örnek: "sayaç gösterilir" ile
  "sayaç gün, saat ve dakika gösterir" tek senaryodur. İkisi de aynı bakışta görülür.

Ayır:

- Akış uzunsa her kontrol ayrı senaryo olur. Örnek: Availability'de PNR'lı işlemler.
  Her biri ayrı kurulum ve ayrı koşum süresi ister.
- Kontrol ayrı test verisi istiyorsa ayır. Veri kurulumu asıl maliyettir.
- Sonucu ayrı izlemek gerekiyorsa ayır. Birleşik senaryo FAIL olursa hangi kontrolün
  düştüğü koşum kaydından okunmaz.

Bir senaryo birden fazla kanalda geçerliyse **her kanal için ayrı case** aç. Adımlar
aynıdır, `Channel` alanı farklıdır.

## Yeni case açma

```bash
node scripts/jira.mjs create --project AJETPSSD --type Test \
  --summary "WEB - Kampanya Geri Sayım | Sayaç anasayfada gösterilir" \
  --description "Aktif kampanyanın geri sayım modülü anasayfada görünür." \
  --field.testType Manual \
  --field.testRunType Manuel \
  --field.assignee 932357 \
  --field.channel "WEB-Desktop" \
  --field.testLayer "End to End" \
  --field.scenarioType Positive \
  --field.priority High \
  --dry-run
```

`--dry-run` çıktısını kullanıcıya göster, onay al, sonra `--confirm` ile tekrarla.

### Zorunlu alanlar

| Alan | Değer |
|---|---|
| `--field.testType` | `Manual` (varsayılan) \| `Cucumber` \| `Generic` |
| `--field.testRunType` | `Manuel` \| `Otomasyon` |
| `--field.assignee` | `932357` - her zaman Ebrar. Başka değer verme |
| `--field.channel` | `WEB-Desktop` `Responsive-IOS` `Mobil-Android` `Mobil-IOS` `API-Web` `API-Mobil` |
| `--field.testLayer` | `Component` \| `API` \| `End to End` |
| `--field.scenarioType` | `Positive` \| `Negative` \| `Edge Case` \| `Boundary Value` |
| `--field.priority` | `Critical` \| `High` \| `Medium` \| `Low` |
| `--field.module` | `Booking` `MyTrips` `Check-in` `Login` `Standalone` `Payment` … |

`testLayer`, `scenarioType` ve `priority` olmadan `create` çalışmaz. CLI engeller.

**`Boundary Value` ile `End to End` birlikte kullanılmaz.** CLI bu ikiliyi `--dry-run`
aşamasında bloklar. Sınır değeri testini `Component` katmanına al.

**Priority'yi düşünerek seç.** AJETPSSD'de 16.699 case `Medium`. Bu dokunulmamış
varsayılandır, risk değerlendirmesi değil. Değeri iş ve sistem etkisine göre ver.

### Özet formatı

```
<KANAL> - <Component> | <beklenen davranış>
```

Türkçe yaz. İlk önek senaryonun kanalıdır ve `Channel` alanıyla uyuşur.

| Channel | Önek |
|---|---|
| `WEB-Desktop` | `WEB` |
| `Mobil-IOS` | `IOS` |
| `Mobil-Android` | `AND` |
| `Responsive-IOS` | `RWEB` |
| `API-Web` | `APIW` |
| `API-Mobil` | `APIM` |

Örnek: `AND - Kampanya Geri Sayım | Kampanya detay sayfasında sayaç gösterilmez`

Eski otomasyon case'leri `<Modül> | <Rota/Tip> | <Varyant>` kalıbını kullanır. Onları
okurken gerekir, yeni case'de kullanma. Detay `docs/conventions.md`'de.

## Story'ye bağla - zorunlu

Bir story için yazdığın her case story'ye bağlanır. Bağlanmayan case kapsam raporunda
görünmez.

```bash
node scripts/jira.mjs links <STORY-KEY>                                # mevcut bağlantılar
node scripts/jira.mjs link <TEST-KEY> --to <STORY-KEY> --type Tests --dry-run
node scripts/jira.mjs link <TEST-KEY> --to <STORY-KEY> --type Tests --confirm
```

**Yön kritik.** Test inward tarafta, story outward tarafta olur. Komutta test önce,
story `--to` ile sonra gelir. Doğru kurulduğunda story'de `tested by <TEST>` görünür.

Ters kurarsan testte `tested by <STORY>` görünür. Bu yanlıştır ve kapsam raporunu bozar.
Doğrula:

```bash
node scripts/jira.mjs links <TEST-KEY>     # YON sutununda 'tests' yazmali
node scripts/jira.mjs story <STORY-KEY>    # bagli testler listesinde gorunmeli
```

Yanlış kurulan bağlantıyı `node scripts/jira.mjs unlink <linkId> --confirm` ile sil ve
tekrar kur.

## Test Set ve Test Execution

Yeni case'ler ilgili set ve execution'a eklenir. Hangisi olduğunu kullanıcı söyler.
**Tahmin etme, sor.**

Kanal ayrımı execution tipine göre değişir:

- **Sprint fonksiyonel set ve execution:** Kanal ayrımı yok. WEB, AND ve IOS case'leri
  aynı set ve execution'a girer. Örnek: `V17 Fonksiyonel Test Set`.
- **Regresyon set ve execution:** Kanal kapsamlıdır. Örnek: `Web - V16.1 Test Set`
  içine mobil case koyma.

### Story'lere bağla - zorunlu

Set ve execution, içindeki case'lerin story'lerine bağlanır. Böylece story ekranında
senaryoların hangi sette toplandığı ve nerede koşulduğu görünür. Ekibin kullandığı
bağlantı tipleri şunlardır:

| Bağlantı | Tip | Görünüm |
|---|---|---|
| Execution → Story | `Tests` | Execution'da `tests <STORY>` |
| Set → Story | `Allocated` | Sette `Allocated from <STORY>` |
| Execution → Set | `Allocated` | Execution'da `Allocated from <SET>`, sette `Allocated to <EXEC>` |

Komutlarda kaynak issue önce, hedef `--to` ile sonra gelir:

```bash
node scripts/jira.mjs link <EXEC-KEY> --to <STORY-KEY> --type Tests --dry-run
node scripts/jira.mjs link <SET-KEY>  --to <STORY-KEY> --type Allocated --dry-run
node scripts/jira.mjs link <EXEC-KEY> --to <SET-KEY>   --type Allocated --dry-run
```

Kurallar:

- Set'e veya execution'a yeni bir story'nin case'ini eklediğinde o story'yi de bağla.
- Yeni set ve execution açtığında ikisini birbirine `Allocated` ile bağla.
- Bağlamadan önce `links <KEY>` ile mevcut bağlantıyı kontrol et. Aynı bağlantıyı iki kez kurma.
- Kurduktan sonra `links <SET-KEY>` ve `links <EXEC-KEY>` ile yönü doğrula. Yön tablodaki
  görünümle aynı olmalı. Yanlışsa `unlink <linkId>` ile sil ve tekrar kur.
- Set ve execution'a bağlantıyı `Relates` ile kurma. `Relates` yön taşımaz.

### Açıklamayı güncelle

Set veya execution'a madde eklediğinde açıklamasını da güncelle. Okuyan kişi hangi story
için kaç senaryo girdiğini görmelidir. Kalıp:

```
<STORY-KEY>  <story özeti>  <N> senaryo
```

Koşum sonrası aynı satırı durumla güncelle:

```
<STORY-KEY>  <story özeti>  <N> senaryo - 7 PASS, 2 FAIL, 1 bug bekliyor
```

Kurallar:

- Kısa tut. Okuyan kişi işi zaten biliyor. Açıklama, giriş cümlesi ve tarih yazma.
- Her story bir satırdır. Mevcut satırları silme, sonuna ekle.
- Sayı tutarlı olsun. PASS + FAIL toplamı senaryo sayısını geçmesin.
- Güncellemeyi `--dry-run` ile göster, onay al, `--confirm` ile uygula.

## Güncelleme

```bash
node scripts/jira.mjs update <KEY> --field.channel "Mobil-Android" --dry-run
node scripts/jira.mjs update <KEY> --summary "..." --confirm
```

## `Update Pending` kuyruğu

Şu an **227** case bakım bekliyor. Bunları işlerken:

```bash
node scripts/jira.mjs search "project=AJETPSSD AND issuetype=Test AND status='Update Pending'" --count-by module
```

1. Önce **neden** güncelleme gerektiğini anla - bağlı story değişmiş mi, test mi bayatlamış?
   `node scripts/jira.mjs get <KEY>` → bağlantılara bak → ilgili story'yi oku.
2. Değişikliği yap.
3. Uygun statüye geçir: `BDD Review` (Gherkin değiştiyse) veya `Automated` (sadece metadata).

**Toplu işlem yapma.** Önce 1 case'i baştan sona götür, kullanıcıya Jira'da gözle doğrulat,
sonra kalanlara geç. 227 case'i tek komutla güncellemek geri alınamaz bir hata olur.

## Manuel test adımları

`Manual` tipli case'lerde adımlar `customfield_18809`'da, yapılandırılmış biçimde durur.
Mevcut adımları görmek için:

```bash
node scripts/jira.mjs steps <KEY>
```

Adım biçimi:

- Numaralandır. Her adım tek eylem.
- Emir kipi kullan: "Uçuşlarım sekmesini aç."
- Gerçek veri yaz: PNR, tarih, tutar, port, kullanıcı.
- Beklenen sonucu **sadece son adıma** yaz, `BEKLENEN:` ile başlat.
- Beklenen sonuç gözlemlenebilir olsun: mesaj, durum, değer. "Doğru çalışır" yazma.

```
1. Uçuşlarım sekmesini aç.
2. Acente PNR'ı ve soyadı ile ara.
3. Uçuş kartındaki işlemleri görüntüle.
BEKLENEN: Paketini Yükselt butonu görünmez. Diğer kart işlemleri görünür.
```

> **Yazma tarafı CLI'da henüz yok.** Adımları `reports/` altına dosyaya çıkar ve
> kullanıcıya ver; Jira arayüzünden yapıştırır. `jira.mjs`'e `steps --set` alt komutu
> eklenecek (bkz. plan). Tek seferlik script yazma.

## Statü geçişi

```bash
node scripts/jira.mjs transitions <KEY>              # nereye gidebilir?
node scripts/jira.mjs transition <KEY> --to "BDD Review" --comment "..." --confirm
```

Hangi statünün ne anlama geldiği `docs/conventions.md`'de.
