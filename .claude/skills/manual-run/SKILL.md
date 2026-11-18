---
name: manual-run
description: Guide a manual test run (mobile web or desktop) step by step and record the result to Xray — PASS/FAIL, evidence, linked defects. Use when the user wants to run a test case manually, work through a test execution, or record results of testing they just did.
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

Kuyruğu `--status TODO` ile belirle — zaten PASS olanı tekrar koşturma. Sıralı ilerle,
her testten sonra sonucu yaz, sonra bir sonrakine geç.

## Koşum öncesi — tek test

```bash
node scripts/jira.mjs get <TEST-KEY>      # kanal, modül, tip
node scripts/jira.mjs steps <TEST-KEY>    # manuel adımlar
node scripts/jira.mjs runs <TEST-KEY>     # geçmiş — daha önce ne olmuş?
node scripts/jira.mjs run <TEST-KEY> --exec <AJPSST-KEY>   # bu koşumun hâlihazırdaki durumu
```

Geçmişe **mutlaka bak**. Test daha önce hep FAIL'se bu bir ürün hatası değil, bayat test
olabilir. Son koşumda hangi defect bağlanmış, ona da bak.

Cucumber tipli case'lerde `steps` boş döner — adımlar Gherkin'de. `get` çıktısındaki
`CUCUMBER SCENARIO` bölümünü adım listesi olarak kullan.

## Koşum sırasında

- Adımları **teker teker** sun, hepsini birden dökme. Kullanıcı ekranda takip ediyor.
- Her adımda beklenen sonucu da söyle.
- Kullanıcı "oldu / olmadı" dediğinde not al; olmadıysa **ne olduğunu** sor.
- Ortam bilgisini baştan netleştir: hangi URL, hangi cihaz/tarayıcı, hangi kullanıcı/PNR.

## Yazmadan önce — üzerine yazma koruması

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

Uzun koşum notu (ortam, PNR, adım adım gözlem) için ayrı komut var — çok satırlı metni
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
3. **Hemen bug açma** — önce `bug-triage` skill'ini çalıştır. Bu bir iş kuralı olabilir.
4. Karar bug ise bug'ı aç, sonra koşuma defect olarak bağla.

> Defect bağlama CLI'da **yok** — `runs`/`run` bağlı defect'leri okur ama yazamaz.
> Bağlamayı kullanıcı Jira arayüzünden yapar; ona bug key'ini ve koşumu
> (`<TEST-KEY> @ <EXEC-KEY>`) ver.
>
> API tarafı belli: `PUT /rest/raven/1.0/api/testrun/<id>` body `{"defects":{"add":["KEY"]}}`
> (bkz. `docs/jira-map.md`). `jira.mjs`'e `defect` alt komutu eklenebilir.

## Evidence (ekran görüntüsü)

Xray koşumlarına ekran görüntüsü eklenir (mevcut koşumlarda 2-8 adet görülüyor).
**FAIL yazarken kanıt şart** — kanıtsız FAIL triyaj edilemez.

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

## Dürüstlük

Koşulmayan adımı "geçti" yazma. Kullanıcı bir adımı atladıysa sonucu `TODO` bırak
veya yoruma atlandığını yaz. Yanlış PASS, hiç koşmamaktan kötüdür.
