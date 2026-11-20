---
name: bug-triage
description: Decide whether an observed behaviour is a defect or intended business rule, and file a well-formed bug when it is a defect. Use when the user says something looks wrong, a test failed, they are unsure if behaviour is expected, or they want to report a bug on jira.thy.com.
---

# Bug mu, iş kuralı mı?

Bir davranış yanlış görünüyor diye bug değildir. Önce **kanıt topla**, sonra karar ver.
Yanlış açılan bug ekibin zamanını yakar; kaçırılan bug müşteriye gider.

## Karar akışı

### 1. Davranışı netleştir
Ne yapıldı, ne bekleniyordu, ne oldu? Ortam, kanal, PNR/kullanıcı, tarih.
Eksikse **sor** — varsayımla ilerleme.

### 2. Domain'e bak
`docs/domain.md` — bu kural daha önce öğrenilmiş olabilir. Varsa iş kuralıdır, biter.

### 3. Kabul kriterine bak
```bash
node scripts/jira.mjs search "project=DIJITALTP AND summary ~ 'refund' AND updated >= -180d" --max 10
node scripts/jira.mjs story <DIJITALTP-KEY>
```
Kabul kriteri bu davranışı tarif ediyorsa → **iş kuralı**.
Tersini tarif ediyorsa → **bug**, kanıtın bu.

### 4. Mevcut testlere bak
```bash
node scripts/jira.mjs search "project=AJETPSSD AND issuetype=Test AND summary ~ '<modül>' AND status=Automated" --max 10
node scripts/jira.mjs get <TEST-KEY>
```
Geçen bir `Automated` test bu davranışı **doğruluyorsa** → iş kuralı (ve senin beklentin yanlış).
Test bunun tersini doğruluyor ama şimdi başarısızsa → **regresyon**, güçlü bug sinyali.

### 5. Koşum geçmişine bak
```bash
node scripts/jira.mjs runs <TEST-KEY>
```
Daha önce PASS'ken şimdi FAIL → regresyon. Hep FAIL → belki test yanlış, ürün değil.

### 6. Daha önce açılmış mı?
```bash
node scripts/jira.mjs search "project in (AJETPSSD, DIJITALTP) AND issuetype in (Bug, Defect) AND summary ~ '<anahtar kelime>'" --max 10
```
Duplicate açma.

## Kararı sunarken

Üç sonuçtan biriyle bitir, **gerekçesini kaynağıyla** ver:

| Sonuç | Ne yaz |
|---|---|
| **İş kuralı** | Hangi story/kabul kriteri bunu söylüyor. `docs/domain.md`'ye ekle. |
| **Bug** | Hangi kriter ihlal edilmiş, hangi test regresyona girmiş. Bug aç. |
| **Belirsiz** | Neyin eksik olduğunu söyle, kime sorulacağını öner. **Tahmin etme.** |

Üçüncüsü meşru bir cevaptır. Kanıt yoksa "muhtemelen bug" deme.

## Bug açma

Yalnızca karar "bug" ise. Önce `Bug` mı `Defect` mi olduğunu kullanıcıya sor
(ikisi de kullanımda — bkz. `docs/domain.md` açık sorular).

Referans bug (onaylı stil): **AJETPSSD-49754**. Şablon: `bug-template.html` (bu klasörde).

### Akış

1. **Davranışı kendin tekrar et** (web ise Claude in Chrome ile). Kullanıcının tarifiyle yetinme.
   Tarif edilenden farklı çıkarsa bug açmadan dur, kullanıcıya bildir.
2. **Kanıt topla — tek oturumda.** conversationId, correlationId ve ekran görüntüleri
   aynı tarayıcı oturumundan gelmeli. Yeniden sorgu yaparsan hepsini yeniden al.
3. **Görselleri işaretle:** `ANNOTATE_BORDER=5 node scripts/annotate.mjs <in.jpg> <out.png> x,y,w,h ...`
   Hatalı alanı ve bağlamını (ör. bilgi notu) kırmızı çerçeveye al. Çıktıyı `Read` ile gözle kontrol et.
   **Gizlilik kontrolü:** Görselde token, Authorization başlığı, cookie, canlıya giden istek veya kişisel
   veri (TC kimlik, telefon, e-posta, kart) varsa `node tools/mark.mjs <in> <out.png> --blur x1,y1,x2,y2`
   ile bulanıklaştır veya yüklemeden önce kullanıcıya sor. Görseli küçültme.
4. `reports/bug-<PNR>/bug.html` yaz → `create --dry-run` ile alanları **kendin** kontrol et → doğrudan `--confirm`.
   **Bug create için kullanıcı onayı beklenmez** (Ebrar, 2026-11-18: "sorma bir daha, direkt ekle").
   Bu istisna yalnız kullanıcının istediği bug'ı açmak, Sprint/Takım PUT'u, ek yükleme ve ilgili bug'a
   "Relates" bağlantısı için geçerli. Toplu güncelleme ve test case/execution yazma işlemleri hâlâ onay ister.
   Belirsiz veri (versiyon, squad, cihaz) varsa yine sor; tahmini değeri açıklamaya yazma.
5. GET ile doğrula. CLI'ın desteklemediği alanları (Sprint `customfield_12001`,
   Takım `customfield_28100` = `[{key:"TK-..."}]`) PUT ile ekle.
6. Görselleri `attach <KEY> --file ... --confirm` ile yükle.
7. **Bug'ı bağla, havada bırakma:**
   - Story'nin fonksiyonel testinde çıktıysa: story'ye **ve** execution'a bağla.
   - Story'ye ait değilse: yalnızca execution'a bağla.
   - Execution: `link <BUG-KEY> --to <EXEC-KEY> --type Allocated --confirm`.
   - Story: bağlantı tipi ilk denemede kullanıcıyla belirlenecek (aday `Relates`).
   - Execution belli değilse sor. Detay: manual-run skill'i, "Bug'ları story'ye ve execution'a bağla" bölümü.

```bash
node scripts/jira.mjs create --project AJETPSSD --type Bug \
  --summary "<Kanal> | <Modül> | <Kısa belirti>" \
  --field.description @reports/bug-<PNR>/bug.html \
  --field.assignee <id> --field.priority High --field.components Web \
  --field.labels REG.2.2.1 --field.fixVersions V16.1 --field.parentLink FT-30992 \
  --field.team "Discovery Squad" --field.relatedExec <EXEC> \
  --field.bugType Test --field.qaProcess "Regresyon Testi" --field.qaOrigin "Manuel Test" \
  --dry-run
```

- Component kanal adıdır: `Web` · `IOS` · `ANDROID` · `Web-Responsive`.
- Related Test Execution (v16.1): Web `AJETPSSD-48605` · iOS `AJETPSSD-48612` · Android `AJETPSSD-48606`.
- Sprint kapanmış olabilir. Squad'ın **ACTIVE** sprint'ini JQL ile bul, eski id'yi kullanma.

### Açıklama formatı — HTML, wiki markup DEĞİL

Jira açıklama alanı **JEditor** kullanır ve **HTML** saklar. Wiki markup (`h3.`, `{code}`)
düzgün render edilmez; `{code}` düz metin olarak görünür. Ekip HTML yazar.

Çalışan etiketler: `<p dir="auto">`, `<b>`, `<ul>/<ol>/<li>`, `<code>`, `<pre dir="auto">`,
`<span style="color:#...">`.

Bölümler, bu sırayla:

| Başlık | İçerik |
|---|---|
| **Test Verileri** | Yalnız bug'ı tekrar üretmek ve fix'lemek için gereken veri. Aşağıdaki "Test Verileri - neyi yaz" kuralına bak |
| *servis yanıtı* | Kritik alanlar `<pre>` bloğunda, hizalı `alan : değer` |
| **Steps to Reproduce** | Numaralı liste, her adım tek eylem, ekran/buton adları kalın |
| **Expected Result** | Maddeli. İlk madde **yeşil** (`#27ae60`) kalın ana beklenti |
| **Actual Result** | Maddeli. İlk madde **kırmızı** (`#c0392b`) kalın ana hata |
| **Ekler** | Her dosya: kalın ad + `-` + ne kanıtladığı, tek cümle |
| **Etki** | Maddeli: kim, hangi akış, tutarsızlık/workaround |

Başlıklar: "Test Verileri", "Ekler", "Etki" Türkçe; "Steps to Reproduce", "Expected Result",
"Actual Result" İngilizce. Paragraf yazma, madde kullan.

### Test Verileri - neyi yaz (kullanıcı revizesi, 2026-11-19)

Her satır için sor: *Geliştirici bu bilgi olmadan bug'ı tekrar üretebilir veya log'u bulabilir mi?*
Cevap "evet" ise satırı yazma.

Her zaman yaz:
- **Ortam** (Preprod/Prod) ve kanal + **uygulama versiyonu**. Versiyon kaynağı, sırayla:
  1. Kullanıcının söylediği versiyon.
  2. Bug'la ilgili dev task'ın release versiyonu (fixVersion).
  3. Bilinmiyorsa güncel uygulama build'i (2026-11-19: `2.2.1.47`).
  Uygulama versiyonu (`2.2.1.47`) ile Jira fixVersion'ı (`V16.1`) ayrı şeylerdir. Açıklamaya uygulama versiyonunu yaz.
- **Cihaz** (mobil bug'da zorunlu): iOS -> `iPhone 13`, Android -> `Samsung Galaxy A32`.
  Kullanıcı başka cihaz söylemedikçe bunları yaz. iOS/Android sürümü biliniyorsa ekle, bilinmiyorsa uydurma.
- **Koşum tarihi**.
- Varsa **conversationId** ve **correlationId** (çağrı başına alt madde: `POST /yol -> <code>id</code>`).

Bug'a bağlıysa yaz:
- **PNR / Soyad**: akış PNR ile başlıyorsa **ikisini birlikte** yaz. PNR login soyad ister, PNR tek başına yetmez.
  Soyad görselde veya kaynakta yoksa kullanıcıya sor. Hata PNR'ın içeriğine bağlıysa kalın yap.
- **Giriş tipi**: hata giriş tipine bağlıysa yaz (ör. üye girişi yok, PNR login). Kritik koşulu kırmızı yap.
- **Uçuş, paket, yolcu tipi, rota**: yalnız hata bu bilgiye bağlıysa yaz.
  Ör. paket yükseltme bug'ında paket gerekir. Popup kapanmama bug'ında gerekmez.
- Servis yanıtı: yalnız hatayı açıklayan alanlar.

Yazma: hatayla ilgisi olmayan rota, saat, paket, yolcu sayısı, "test tipi" gibi metadata
(QA Process alanı bunu zaten tutuyor).

**Yapma (kullanıcı revizesi, 2026-11-18):**
- Uzun tire `—` ve ok `→` kullanma. Yerine `-` ve `->` yaz. Yapay zeka metni gibi duruyor.
- Görselleri açıklamaya gömme (`<img>`). Sadece ek olarak yükle, Ekler'de tanımla.
- "Kırmızı çerçeve hatalı alanı gösterir" gibi açıklama notu ekleme. Çerçeve kendini anlatır.
- iOS/web karşılaştırması veya eski bug referansını kullanıcı istemedikçe yazma.

### conversationId ve correlationId yakalama (web)

`read_network_requests` yanıt gövdesi ve istek başlığı vermez. Sorgudan **önce** sayfaya
fetch/XHR dinleyicisi kur (`javascript_tool`), sonra akışı yürüt:

- **correlationId:** yanıt gövdesinde `"correlationId":["..."]`. Her ilgili çağrı için al.
- **conversationId:** istek başlığı `x-conversation-id`. Aynı değer `sessionStorage.conversationId`'de de var.
- Dinleyici SPA geçişlerinde yaşar. Tam sayfa yenilemede kaybolur, yeniden kur.
- Token, cookie gibi değerleri ekrana basma; sadece bu iki id'yi ve gerekli iş alanlarını filtrele.

**Backend bug'ında `correlationId` zorunlu.** conversationId bulunabildikçe her bug'a eklenir.
Geliştirici log'u bunlarla buluyor.

### Zorunlu alanlar ve tuzaklar

- `assignee` zorunlu. Boş bırakma.
- Create body'sine gönderilmeyecek 8 alan var (400 döner) — `docs/jira-map.md`.
- Parent Link `FT-30992`, fixVersion `V16.1`.
- 2026-11-19'dan sonra `REG.2.2.1` label'ı **koyma**. `relatedExec` alanını kullanıcı söylemedikçe boş bırak.
  Keşif testinde bulunan bug'da `--field.qaProcess "Keşif"` kullan.
- Sprint, Takım ve Squad id'leri `docs/jira-map.md` içinde. **Net değilse kullanıcıya sor.**
- Severity API'den set edilmez. Create sonrası varsayılan `S3 - Major` geliyor (AJETPSSD-49754'te doğrulandı). GET ile kontrol et; farklıysa kullanıcı arayüzden düzeltir.
- Create sonrası GET ile doğrula. Reddedilen alanı PUT ile ekle.

Bug açıldıktan sonra ilgili test case'e bağla ve koşum sonucuna defect olarak ekle.

## Kaydet

Karar ne olursa olsun, yeni öğrenilen iş kuralını `docs/domain.md`'ye ekle.
Bu dosya kullandıkça değerlenir — atlamak, aynı soruyu bir ay sonra tekrar sormaktır.
