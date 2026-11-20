# Jira / Xray Haritası — jira.thy.com

Canlı API'den keşfedildi (2026-11-12). Alan id'leri `scripts/lib/fields.mjs` içinde kodlanmıştır;
burayı değiştirirsen orayı da güncelle.

## Bağlantı

```
Base URL : https://jira.thy.com
Tip      : Jira Server / Data Center  (Cloud DEĞİL)
Auth     : Authorization: Bearer <PAT>        ← .env içindeki XRAY_TOKEN
TLS      : certs/corp-ca-bundle.pem zorunlu   ← kurumsal MITM proxy
```

Jira Cloud'un `email:api_token` basic auth'u burada **çalışmaz**. PAT, kullanıcı profilinden
(*Profile → Personal Access Tokens*) üretilir ve hem Jira REST hem Xray (raven) için geçerlidir.

## Projeler

| Anahtar | Rol | Hacim |
|---|---|---|
| `AJETPSSD` | Test repository — Test, Test Set, Pre-Condition | 18.799 Test issue |
| `AJPSST` | Test Execution / Test Plan | — |
| `DIJITALTP` | Story / requirement — kabul kriterleri | — |

## Custom field'lar

Bir Test issue'ında ~99 dolu alan döner; bunların yaklaşık 90'ı `TimeInStatus(...)` gürültüsüdür.
`clean()` (bkz. `scripts/lib/fields.mjs`) bunları ayıklar. Anlamlı olanlar:

### Xray

| ID | Ad | Not |
|---|---|---|
| `customfield_18805` | Test Type | `Manual` \| `Cucumber` \| `Generic` |
| `customfield_18806` | Cucumber Test Type | `Scenario` \| `Scenario Outline` |
| `customfield_18807` | **Cucumber Scenario** | Gherkin gövdesi — **Jira ↔ otomasyon köprüsü** |
| `customfield_18808` | Generic Test Definition | |
| `customfield_18809` | Manual Test Steps | Manuel case adımları |
| `customfield_18827` | Requirement Status | |

### THY / AJet süreç alanları

| ID | Ad | Değerler |
|---|---|---|
| `customfield_21102` | **Channel** | `WEB-Desktop` (6.474) · `API-Web` (3.140) · `Mobil-IOS` (2.163) · `Mobil-Android` (2.001) |
| `customfield_21116` | Modul / Sub Modul | `Standalone`, `Ödeme`, `Login`, `IRROPS`, `General`, `AJET` … |
| `customfield_21103` | TestRunType | `Otomasyon` … |
| `customfield_20143` | Otomasyon | `Yapılacak` … |
| `customfield_20509` | Process | |
| `customfield_20254` | Completed Percentage | |

> Alan aramak için: `node scripts/jira.mjs fields "cucumber"` (1.775 alan içinde regex arar)

## Test workflow

```
Waiting For BDD ─→ BDD Review ─→ Non Automated ─→ Automated ─→ Automation Review
                                                       │
                              Update Pending ─→ Update Review ─→ Manual
```

Güncel dağılım (AJETPSSD, issuetype=Test):

| Statü | Adet | Anlamı |
|---|---:|---|
| `Backlog` | 16.078 | Henüz sıraya girmemiş |
| `Automated` | 1.105 | Otomasyonu çalışır durumda |
| `Automation Review` | 259 | Otomasyon kodu incelemede |
| **`Update Pending`** | **227** | **Case bakım bekliyor — aktif iş kuyruğu** |
| `Non Automated` | 174 | Manuel koşuluyor |
| **`Waiting For BDD`** | **118** | **Gherkin yazılması bekleniyor — aktif iş kuyruğu** |
| `BDD Review` | 31 | Yazılan Gherkin incelemede |
| `Update Review` / `Manual` | 0 | Kullanımda değil |

İki aktif kuyruk: **Waiting For BDD** (118) ve **Update Pending** (227).

## Xray (raven) endpoint'leri — doğrulandı

| Endpoint | Döndürdüğü |
|---|---|
| `GET /rest/raven/1.0/export/test?keys=A;B` | Tag'li `.feature` dosyası (düz metin) |
| `GET /rest/raven/1.0/api/test/<KEY>/step` | Manuel adımlar (Cucumber tipinde boş döner) |
| `GET /rest/raven/1.0/api/test/<KEY>/testruns` | Koşum geçmişi: status, evidence, defect |
| `GET /rest/raven/1.0/api/testrun?testExecIssueKey=&testIssueKey=` | Tek koşum kaydı |
| `PUT /rest/raven/1.0/api/testrun/<id>/status?status=PASS` | Koşum sonucu yaz |
| `PUT /rest/raven/1.0/api/testrun/<id>/comment` | Koşum yorumu yaz |
| `PUT /rest/raven/1.0/api/testrun/<id>/attachment` | Kanıt yükle |
| `GET /rest/raven/1.0/api/settings/teststatuses` | Geçerli statüler: PASS, FAIL, TODO, ABORTED, EXECUTING |

### Birleşik PUT — tek çağrıda hepsi

CLI yukarıdaki alt endpoint'leri kullanır. Raven ayrıca tek gövdeyi kabul eder:

```
PUT /rest/raven/1.0/api/testrun/<id>
{
  "status":   "PASS",
  "comment":  "...",
  "evidences": { "add": [ { "filename": "1_yolcu_secimi.jpg",
                            "contentType": "image/jpeg", "data": "<base64>" } ] },
  "defects":  { "add": ["AJETPSSD-49216"] },
  "assignee": "932357"
}
```

**Defect bağlama ve koşum assignee değiştirme yalnızca bu gövdeyle yapılır.**
`jira.mjs`'de henüz alt komutu yok (bkz. `manual-run` skill'i).
Kaynak: VS Code Copilot koşum prompt'u, saha kullanımıyla doğrulandı.

## API kullanım kuralları

- **Rate limit (429) var.** Çağrılar arasında 300–700 ms bekle. Koşum geçmişini
  sınırlı çek — son ~5 run yeter.
- JSON gönderirken UTF-8 byte ve `Content-Type: application/json; charset=utf-8`
  kullan. Aksi halde Türkçe karakter bozulur. `scripts/lib/http.mjs` bunu yapar.
- Her yazma işleminden sonra GET ile doğrula. Tek satırda raporla.

## JQL tuzakları

- **`labels not in (...)` etiketsiz issue'ları da eler.** `NOT IN` boş alanla eşleşmez.
  Etiketsizleri dahil etmek için `(labels not in (...) OR labels is EMPTY)` yaz.
  Örnek (2026-11-18): V17 story sorgusu 20 döndü, doğru sorgu 40. Ebrar'ın kendi story'si
  AJETPSSD-48093 eksik kalan 20'nin içindeydi.
- Aynı kural `component not in`, `fixVersion not in` ve diğer çok değerli alanlar için de geçerli.

### V17 story sorgusu (düzeltilmiş)

```
fixVersion in (V17) AND project in (AJETPSSD) AND issuetype in (Story)
AND (labels not in (notest, no-test, Erişilebilirlik) OR labels is EMPTY)
AND status not in (Cancelled, "Ready For Release")
```

`export/test` çıktısı Test issue key'ini ve bağlı tüm requirement key'lerini tag olarak taşır:

```gherkin
@AJETPSSD-30250 @DIJITALTP-75458 @DIJITALTP-75588 ...
Scenario: Payment | International - Germany RT 1 ADT EURO with Klarna
```

Bir test 70'ten fazla requirement'a bağlı olabilir (regresyon kapsamı geniş).

## Issue tipi → statü (AJETPSSD)

| Tip | Statüler |
|---|---|
| `Story` | Open · Analysis · Development · Ready to Test · Test · UAT · Ready For Release · Test Done · Waiting For BugFix · Closed |
| `Bug` | Open · Analysis · Development · Test · Ready to Test · Reopened · Waiting For Information · Rejected · Closed |
| `Defect` | Analysis · Development · Test · Ready For Deployment · Monitoring · Reopened · Rejected · Closed |
| `Test Execution` | Open · In Progress · Resolved · Reopened · Backlog · Closed |
| `Test Plan` | Open · In Progress · Resolved · Reopened · Backlog · Closed |
| `Pre-Condition` | To Do · In Progress · Done · Blocked · In Code Review · Backlog |

`Bug` ve `Defect` ayrı tiplerdir — hangisinin kullanılacağı ekip konvansiyonuna bağlı (bkz. `docs/conventions.md`).

## Bug create — API tuzakları (2026-11-12, AJETPSSD-49216)

- `assignee` **zorunlu**. Boş bırakılırsa HTTP 400 döner.
- `Severity` (customfield_12601) API'den **set edilemez**: "not on the appropriate screen".
  Create ve edit ekranında yok. Arayüzden elle girilir. Projede tek değer kullanılıyor:
  `S3 - Major`.
- Issue'ya ek yükleme: `jira.mjs attach <KEY> --file <yol>` (--exec vermezsen issue'ya gider).
- Ek silme: `DELETE /rest/api/2/attachment/<id>`.

### Bug alanlari — API'den yazilabilir mi?

| Alan | API | Not |
|---|---|---|
| assignee, priority, components, labels, fixVersions | evet | assignee zorunlu |
| QA Process, QA Origin, Bug Type | evet | option: `{value}` |
| Related Test Execution (22758) | evet | varsayilan AJETPSSD-48612 (iOS regresyon) |
| Parent Link (21001) | evet | FT-30992 |
| Team (20403) | evet | option; modulun sahibi squad |
| Severity (12601) | HAYIR | ekranda yok, elle: S3 - Major |
| Otomasyon (20143), Process (20509), 3rd party (19102) | HAYIR | ekranda yok, elle |

### Create body'sine gonderilmeyecek alanlar

Bu alanlar create ekraninda yok. Gonderirsen HTTP 400 doner:

```
customfield_19102 (3rd party)  customfield_12601 (Severity)
customfield_20143 (Otomasyon)  customfield_20254 (Completed Percentage)
customfield_22002              customfield_20509 (Process)
customfield_18719              customfield_28604
```

Gerekiyorsa create sonrasi PUT ile ekle veya arayuzden elle gir.

### Bug create — varsayilan degerler (v16.1 regresyonu)

| Alan | Deger |
|---|---|
| Parent Link `customfield_21001` | `FT-30992` (v16.1 Genel Calismalar) |
| Labels | `REG.2.2.1` |
| fixVersion | `V16.1` |
| Sprint `customfield_12001` | number — asagidaki tablo |
| Takim `customfield_28100` | Insight objesi — asagidaki tablo |
| Squad `customfield_20403` | option |

Sprint id'leri:

| Sprint | id |
|---|---|
| Support Kanban | 78110 |
| Customer Sprint 50 | 94632 |
| Discovery Sprint 49 | 94633 |
| Pacmen Kanban (Middleware) | 84770 |

Takim (Insight) key'leri:

| Takim | key |
|---|---|
| Customer Squad (AJET) | TK-304795 |
| Discovery Squad (AJET) | TK-304824 |
| Middleware | TK-304987 |

> `customfield_20403` ve `customfield_28100` ayni seyi mi tutuyor, **dogrulanmadi**.
> Copilot prompt'u 20403'u "Squad", 28100'u "Takim" diye ayiriyor. Ilk create'te
> ikisini de doldur ve GET ile kontrol et.

Squad, sprint veya takim net degilse create'ten **once kullaniciya sor**.

### Modul -> Team (son 120 gunun bug'larindan)

| Modul | Team |
|---|---|
| Koltuk Secimi, PromoCode, Tur ve Aktivite, Kampanyalar | Support Squad |
| Paket Yukseltme, Bundle Upgrade, Cuzdan, Acilis Animasyonu, Standalone | Discovery Squad |
| Bulgular, Test - Dev Fark Matrisi | CMS Squad |

Check-in karisik (Support/Discovery/Customer) — emin degilsen sor.
