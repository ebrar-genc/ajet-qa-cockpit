---
name: manual-run
description: Guide a manual test run (mobile web or desktop) step by step and record the result to Xray - PASS/FAIL, evidence, linked defects. Use when the user wants to run a test case manually, work through a test execution, or record results of testing they just did.
---

# Manuel koşum

Kullanıcıyı test adımlarında yürütür, sonucu Xray'e yazarsın. Kullanıcı mobil web ve
desktop'ta manuel koşum yapıyor.

## Önce execution'ı seç

Koşum her zaman bir `Test Execution` (`AJPSST-*`) içinde yapılır. Kullanıcı key vermediyse
açık olanları listele, **tahmin etme, sor**:

```bash
node scripts/jira.mjs search "project=AJPSST AND issuetype='Test Execution' AND status in (Open,'In Progress') ORDER BY created DESC" --max 10
```

Execution belliyse içindeki testleri ve mevcut durumlarını çıkar:

```bash
node scripts/jira.mjs exec <AJPSST-KEY>                       # tüm testler + sonuç dağılımı
node scripts/jira.mjs exec <AJPSST-KEY> --mine                # sadece kullanıcıya atananlar
node scripts/jira.mjs exec <AJPSST-KEY> --mine --status TODO  # koşulacak olanlar
```

Kuyruğu `--status TODO` ile belirle - zaten PASS olanı tekrar koşturma. Sıralı ilerle,
her testten sonra sonucu yaz, sonra bir sonrakine geç.

## Koşum öncesi - tek test

```bash
node scripts/jira.mjs get <TEST-KEY>      # kanal, modül, tip
node scripts/jira.mjs steps <TEST-KEY>    # manuel adımlar
node scripts/jira.mjs runs <TEST-KEY>     # geçmiş - daha önce ne olmuş?
node scripts/jira.mjs run <TEST-KEY> --exec <AJPSST-KEY>   # bu koşumun hâlihazırdaki durumu
```

Geçmişe **mutlaka bak**. Test daha önce hep FAIL'se bu bir ürün hatası değil, bayat test
olabilir. Son koşumda hangi defect bağlanmış, ona da bak.

Cucumber tipli case'lerde `steps` boş döner - adımlar Gherkin'de. `get` çıktısındaki
`CUCUMBER SCENARIO` bölümünü adım listesi olarak kullan.

## Koşum sırasında

- Adımları **teker teker** sun, hepsini birden dökme. Kullanıcı ekranda takip ediyor.
- Her adımda beklenen sonucu da söyle.
- Kullanıcı "oldu / olmadı" dediğinde not al; olmadıysa **ne olduğunu** sor.
- Ortam bilgisini baştan netleştir: hangi URL, hangi cihaz/tarayıcı, hangi kullanıcı/PNR.

## Yazmadan önce - üzerine yazma koruması

**Her zaman önce koşumu GET et.** Kullanıcı bazen testi kendisi koşmuş olur.

```bash
node scripts/jira.mjs run <TEST-KEY> --exec <AJPSST-KEY>
```

Koşum zaten `PASS`, `FAIL` veya `EXECUTING` ise, ya da içinde kanıt varsa:
**yazmadan önce kullanıcıya sor.** Geçmişte kopya kanıt yüklendi ve yorum ezildi.

Yorum alanı dolu ise üzerine yazma. Kullanıcı onay verirse yaz.

## Sonuç yazma

```bash
node scripts/jira.mjs result <TEST-KEY> --exec <AJPSST-KEY> --status PASS --dry-run
node scripts/jira.mjs result <TEST-KEY> --exec <AJPSST-KEY> --status PASS --confirm
```

Geçerli statüler: `PASS` `FAIL` `TODO` `ABORTED` (tam liste:
`GET /rest/raven/1.0/api/settings/teststatuses`).

Yorum eklemek için `--comment "..."`. FAIL ise yoruma **ne olduğunu** yaz, "başarısız" yeterli değil.

Uzun koşum notu (ortam, PNR, adım adım gözlem) için ayrı komut var - çok satırlı metni
dosyadan da verebilirsin:

```bash
node scripts/jira.mjs note <TEST-KEY> --exec <AJPSST-KEY> --body "@reports/not.txt" --confirm
```

Yorum ve not formatı `docs/conventions.md` içinde. Kısa yorum kalıbı:

```
PNR: <PNR> - <SOYAD> / <kanal, login|non-login, parkur, yolcu tipleri, brand> . <sonuç>
```

Uzun not kalıbı:

```
Pnr: <PNR>
Surname: <soyad>
Test status: PASS
```

**Yazdıktan sonra GET ile doğrula** ve tek satırda raporla:

```bash
node scripts/jira.mjs run <TEST-KEY> --exec <AJPSST-KEY>
```

## FAIL durumunda

1. Ekran görüntüsünü `attach` ile koşuma yükle.
2. Sonucu FAIL olarak yaz, yoruma belirtiyi ekle.
3. **Hemen bug açma** - önce `bug-triage` skill'ini çalıştır. Bu bir iş kuralı olabilir.
4. Karar bug ise bug'ı aç, sonra koşuma defect olarak bağla.

> Defect bağlama CLI'da **yok** - `runs`/`run` bağlı defect'leri okur ama yazamaz.
> Bağlamayı kullanıcı Jira arayüzünden yapar; ona bug key'ini ve koşumu
> (`<TEST-KEY> @ <EXEC-KEY>`) ver.
>
> API tarafı belli: `PUT /rest/raven/1.0/api/testrun/<id>` body `{"defects":{"add":["KEY"]}}`
> (bkz. `docs/jira-map.md`). `jira.mjs`'e `defect` alt komutu eklenebilir.

## Evidence (ekran görüntüsü)

Xray koşumlarına ekran görüntüsü eklenir (mevcut koşumlarda 2-8 adet görülüyor).
**FAIL yazarken kanıt şart** - kanıtsız FAIL triyaj edilemez.

Yükleme:

```bash
node scripts/jira.mjs attach <TEST-KEY> --exec <AJPSST-KEY> --file <yol> --dry-run
node scripts/jira.mjs attach <TEST-KEY> --exec <AJPSST-KEY> --file <yol> --name "step3-error.png" --confirm
```

Kullanıcının ekran görüntüsü diskte değilse Jira arayüzünden eklemesini söyle, hangi
koşuma ekleyeceğini (`<TEST-KEY> @ <EXEC-KEY>`) net ver.

Kanıtı **ayıkla**. Tekrar eden ekranı, aktivasyon kodu ekranını ve onay pop-up'ını atla.
Dosya adını `1_yolcu_secimi.jpg` kalıbıyla ver (bkz. `docs/conventions.md`).

Önceki koşumun kanıtlarını incelemek için:

```bash
node scripts/jira.mjs evidence <TEST-KEY> --exec <AJPSST-KEY> --download reports/evidence/<TEST-KEY>
```

## Bug'ları story'ye ve execution'a bağla - zorunlu

**Hiçbir bug havada kalmaz.** Kural:

| Bug nerede bulundu | Bağla |
|---|---|
| Bir story'nin fonksiyonel testinde | **Story'ye** ve **execution'a** (ikisine birden) |
| Story'ye ait değil, execution veya versiyon testinde | Yalnızca **execution'a** |

Story'ye bağlanan her bug execution'a da bağlanır.

### Story bağlantısı

> **Bağlantı tipi ilk denemede kullanıcıyla birlikte belirlenecek.** Aday: `Relates`. Ekipte bug ile story arasında en sık bu tip kullanılıyor (son 500 bug'da 7 kayıt; `Allocated` 2, `Defect` 1). İlk denemede `--dry-run` çıktısını göster, kullanıcı tipi onaylasın. Sonra bu notu güncelle.

```bash
node scripts/jira.mjs link <BUG-KEY> --to <STORY-KEY> --type Relates --dry-run
```

### Execution bağlantısı

Böylece execution'a bakan kişi o koşumdan çıkan bug'ları tek yerde görür.

**Bağlantı tipi:** `Allocated` (ekipte execution - bug için en yaygın tip). Execution'da `Allocated to <BUG>`, bug'da `Allocated from <EXEC>` görünür.

```bash
node scripts/jira.mjs links <EXEC-KEY>                                   # mevcut bağlantılar
node scripts/jira.mjs link <BUG-KEY> --to <EXEC-KEY> --type Allocated --dry-run
node scripts/jira.mjs link <BUG-KEY> --to <EXEC-KEY> --type Allocated --confirm
node scripts/jira.mjs links <EXEC-KEY>                                   # YON: 'Allocated to <BUG>' olmalı
```

Kurallar:

- Bug açıldığında (bug-triage) bağlantıyı aynı adımda kur. Bug hangi execution'ın koşumundan çıktıysa ona bağla.
- Bug execution dışında bulunduysa ama o versiyona aitse, versiyonun fonksiyonel execution'ına bağla. Örnek: V17 için `V17 Fonksiyonel Test Execution`. Hangi execution olduğu belli değilse kullanıcıya sor.
- Aynı bağlantıyı iki kez kurma. Önce `links <EXEC-KEY>` ile kontrol et.
- **Hatırlat:** Bir koşum veya story koşumu bittiğinde, o gün açılan bug'ları kontrol et. Story'ye veya execution'a bağlı değilse kullanıcıya listeyle hatırlat ve bağlamayı öner. Kontrol sorgusu: `reporter = currentUser() AND issuetype = Bug AND created >= -1d`.
- Bu bağlantı, koşum seviyesindeki Xray defect alanının yerine geçmez. Koşuma defect bağlama ayrı iş (yukarıdaki "FAIL durumunda" bölümü).

## Story koşumu - execution kaydı ve story kanıtı

> **İlk sürüm.** Bu bölüm ilk denemeden sonra Ebrar'ın geri bildirimiyle şekillenecek.
> Geri bildirimi aldığında bu bölümü güncelle ve bu notu kaldır.

Kullanıcı "şu story'yi koş" dediğinde bu sırayı izle.

### 1. Story'nin case'lerini bul

1. Story'ye bağlı case'leri listele: `node scripts/jira.mjs story <STORY-KEY>`
2. Execution'daki case'leri listele: `node scripts/jira.mjs exec <EXEC-KEY>`
3. İki listenin kesişimini koş. Story'ye bağlı olup execution'da olmayan case varsa kullanıcıya söyle.

### 2. Her case için execution kaydını doldur

1. Case'i koş.
2. Sonucu yaz (`result`).
3. Kanıt görsellerini koşuma ekle (`attach --exec`).
4. Koşum notunu yaz (`note`). Notta ne kontrol edildiğini ve sonucu yaz.

Görsel ve not kuralları:

- Testin amacını kanıtlayan öğeyi **kırmızı çerçeve** ile işaretle. Gerekirse kısa kırmızı etiket ekle.
- Görselin üstüne siyah zeminli metin kutusu koyma.
- **Görseli küçültme.** Orijinal çözünürlükte ve kalitede yükle. Çerçeveyi `node tools/mark.mjs <giriş> <çıkış.png> <x1,y1,x2,y2>` ile çiz. Araç görseli küçültmez ve PNG yazar.
- Yüklemeden önce görseli aç. Çerçevenin yerini **ve** yazıların okunduğunu kontrol et.
- **Gizlilik kontrolü yap.** Bu kural koşum kanıtı, not, yorum, story eki ve bug için geçerlidir. Görselde kritik veri varsa `--blur x1,y1,x2,y2` ile bulanıklaştır veya yüklemeden önce kullanıcıya sor. Emin değilsen sor.
  - Kritik veri: token, Authorization/Bearer başlığı, cookie, oturum kimliği, gizli veya canlı API anahtarı, şifre, canlıya giden istek (örnek: gerçek başlıklı Postman isteği), kişisel veri (TC kimlik, telefon, e-posta, gerçek müşteri adı ve PNR, kart), herkese açık olmayan iç sunucu adı veya IP, Apple Team ID gibi hesap kimlikleri.
  - Kritik değil: Firebase web apiKey, App ID, proje numarası (istemci koduna gömülü, herkese açık), test ortamı adresi, fiyat, test ortamındaki test PNR'ı.
  - Raporda neyi bulanıklaştırdığını kullanıcıya söyle.
- Görselleri senaryo akış sırasına göre numarala. PASS: `1_<amaç>_ok.jpg`. Hatayı gösteren görsel: `<n>_<amaç>_nok.jpg`.
- Notu kısa maddelerle yaz. Anahtar değeri ve sonucu **kalın** yaz. Dolgu cümlesi yazma.
- FAIL notunu bug kartı yapısında yaz: Test Verileri, Steps, Expected, Actual, Ekler.

### 3. Story'nin eklerine test kanıtı ekle

Amaç: Story'ye bakan kişi yapılan değişikliği görselden kolayca anlasın.

1. Story kapsamını gösteren görselleri seç. Her kabul kriteri için en az bir görsel seç. Her case için ayrı görsel ekleme.
2. Story birden çok kanalı kapsıyorsa her kanal için ayrı görsel seç.
3. Değişen öğeyi kırmızı çerçeveyle işaretle. Story'yi okuyan kişi neye bakacağını tek bakışta görmeli.
4. Dosyaları akış sırasına göre numarala. Story key yazma. Kalıp: `<n>_<kısa konu>_ok.png`. Örnek: `1_test01_ajet_nonprod_ok.png`, `2_appid_web_nonprod_ok.png`.
5. Mevcut ekleri kontrol et: `node scripts/jira.mjs attachments <STORY-KEY>`. Aynı görseli iki kez yükleme.
6. Görseli yükle:

```bash
node scripts/jira.mjs attach <STORY-KEY> --file <yol> --name "<ad>" --dry-run
node scripts/jira.mjs attach <STORY-KEY> --file <yol> --name "<ad>" --confirm
```

### 4. Test Results yaz

Story'ye **Test Results** yorumunu yaz: `story-test-result` skill'i. Taslağı göster, onayla yaz.

Kurallar:

- Story eklerini geliştirici, analist ve ürün ekibi de görür. Görselde kişisel veri varsa maskele. Örnek: TC kimlik no, telefon, e-posta.
- Başka kişinin story ekini silme veya değiştirme.
- **Story statüsünü değiştirme.** Koşum bitince story'nin hazır olduğunu kullanıcıya söyle. Statüyü kullanıcı değiştirir. Kullanıcı "kapatalım" dese de statüye dokunma.
- Yüklemeden önce görsel listesini ve adlarını kullanıcıya göster. Onay al.

## Dürüstlük

Koşulmayan adımı "geçti" yazma. Kullanıcı bir adımı atladıysa sonucu `TODO` bırak
veya yoruma atlandığını yaz. Yanlış PASS, hiç koşmamaktan kötüdür.
