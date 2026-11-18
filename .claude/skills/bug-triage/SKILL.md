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

```bash
node scripts/jira.mjs create --project AJETPSSD --type Bug \
  --summary "<Modül> | <Kanal> | <Kısa belirti>" \
  --description "$(cat reports/bug.md)" \
  --field.channel "Mobil-Android" --field.module "Ödeme" --dry-run
```

### Açıklama şablonu (`reports/bug.md`)

```markdown
h3. Ortam
Kanal: Mobil-Android | Ortam: TEST | Tarih: 2026-11-12
PNR / Kullanıcı: ...

h3. Adımlar
1. ...
2. ...

h3. Beklenen
<kabul kriterinden alıntı — kaynağıyla: DIJITALTP-xxxxx>

h3. Gerçekleşen
...

h3. Kanıt
Ekran görüntüsü / log / koşum: AJETPSSD-xxxxx @ AJPSST-xxxxx
İlgili request / response
correlationId: ...

h3. Etki
Hangi akış bloke, kaç kullanıcı etkilenir, workaround var mı
```

Jira Server wiki markup kullanır (`h3.`, `*kalın*`, `{code}`), Markdown değil.

**Backend bug'ında `correlationId` zorunlu.** Her ilgili çağrının id'sini yaz.
Geliştirici log'u bununla buluyor.

### Zorunlu alanlar ve tuzaklar

- `assignee` zorunlu. Boş bırakma.
- Create body'sine gönderilmeyecek 8 alan var (400 döner) — `docs/jira-map.md`.
- v16.1 regresyonunda Parent Link `FT-30992`, label `REG.2.2.1`, fixVersion `V16.1`.
- Sprint, Takım ve Squad id'leri `docs/jira-map.md` içinde. **Net değilse kullanıcıya sor.**
- Severity API'den set edilmez. Kullanıcı arayüzden `S3 - Major` girer.
- Create sonrası GET ile doğrula. Reddedilen alanı PUT ile ekle.

Bug açıldıktan sonra ilgili test case'e bağla ve koşum sonucuna defect olarak ekle.

## Kaydet

Karar ne olursa olsun, yeni öğrenilen iş kuralını `docs/domain.md`'ye ekle.
Bu dosya kullandıkça değerlenir — atlamak, aynı soruyu bir ay sonra tekrar sormaktır.
