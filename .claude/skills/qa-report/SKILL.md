---
name: qa-report
description: Produce QA metrics and regression reports from Jira/Xray — pass rate, automation coverage, channel breakdown, sprint status, Update Pending backlog. Use when the user asks for a report, a summary of test status, coverage numbers, or metrics to share with the team.
---

# QA raporlama

Jira/Xray verisinden rapor üretir, `reports/` altına markdown yazarsın.

## Temel sayımlar

Kesin sayı için `--max 1 --json` ile `total` al — tüm issue'ları çekme:

```bash
node scripts/jira.mjs search "<JQL>" --max 1 --json
```

Dağılım için örnekleme yerine her değer için ayrı sorgu at. `--count-by` sadece çekilen
issue'lar üzerinden sayar; büyük kümelerde yanıltır.

## Hazır metrikler

### Otomasyon kapsamı
```bash
# Otomatik: status in (Automated, 'Automation Review')
# Manuel:   status = 'Non Automated'
# Beklemede: status in ('Waiting For BDD', 'BDD Review', 'Update Pending')
node scripts/jira.mjs search "project=AJETPSSD AND issuetype=Test AND status=Automated" --max 1 --json
```

Referans (2026-11-12): Automated 1.105 · Automation Review 259 · Non Automated 174 ·
Update Pending 227 · Waiting For BDD 118 · BDD Review 31 · Backlog 16.078

> `Backlog`'daki 16.078 case toplamın %85'i. Kapsam oranını hesaplarken Backlog'u
> paydaya katıp katmadığını **açıkça belirt** — yoksa %6 da diyebilirsin %72 de.

### Kanal dağılımı
```bash
for c in WEB-Desktop Responsive-IOS Mobil-Android Mobil-IOS API-Web API-Mobil; do
  node scripts/jira.mjs search "project=AJETPSSD AND issuetype=Test AND Channel='$c'" --max 1 --json
done
```

### Koşum sonuçları
```bash
node scripts/jira.mjs runs <TEST-KEY>     # tek test
```
Bir execution'ın tamamı için Xray API'si gerekir:
`GET /rest/raven/1.0/api/testexec/<EXEC-KEY>/test` — gerekirse CLI'a `exec` alt komutu ekle.

### Sprint / dönem özeti
```bash
node scripts/jira.mjs search "project=DIJITALTP AND issuetype=Story AND status=Closed AND resolutiondate >= -30d" --max 100
node scripts/jira.mjs search "project=AJETPSSD AND issuetype in (Bug,Defect) AND created >= -30d" --count-by status
```

## Rapor formatı

`reports/<konu>-<tarih>.md` olarak yaz. Yapı:

```markdown
# <Başlık> — 2026-11-12

## Özet
<üç cümle: en önemli sayı, en önemli değişim, en önemli risk>

## Rakamlar
| Metrik | Değer | Önceki | Değişim |

## Dikkat gerektirenler
<madde madde, her biri bir aksiyonla>

## Yöntem
<hangi JQL'ler kullanıldı — başkası doğrulayabilsin>
```

## Rapor yazarken

- **Önce sonuç, sonra tablo.** Okuyan kişi sayıyı arıyor.
- Her sayının yanında **tarihi** olsun; metrikler eskiyor.
- Yöntem bölümünü atlama — JQL'i görmeyen kimse sayıya güvenemez.
- Trend iddiası için önceki ölçüm gerekir. Elinde yoksa "ilk ölçüm" de, uydurma.
- Kötü haberi yumuşatma. 227 case bakım bekliyorsa raporda o yazar.

## Grafik

Rapora grafik isteniyorsa `dataviz` skill'ini kullan.
