---
name: jira-query
description: Query Jira/Xray for tests, stories, bugs and executions on jira.thy.com. Use whenever the user asks what is assigned to them, what is in a status or queue (Update Pending, Waiting For BDD), what changed in a sprint, what a given issue contains, or any question that needs a JQL search or an issue lookup in AJETPSSD / AJPSST / DIJITALTP.
---

# Jira sorgulama

Doğal dildeki soruyu JQL'e çevir, `scripts/jira.mjs` ile çalıştır, sonucu Türkçe özetle.

## Önce bunu bil

- Ham `curl` atma. Her şey `node scripts/jira.mjs` üzerinden.
- Alan id'leri ve statü listesi için `docs/jira-map.md`.
- Kullanıcı adı: `EBRAR GENC` → JQL'de `currentUser()` kullan.

## Komutlar

```bash
node scripts/jira.mjs search "<JQL>" [--max N] [--count-by status|channel|type|module]
node scripts/jira.mjs get <KEY>            # tek issue, gürültüsü temizlenmiş
node scripts/jira.mjs story <KEY>          # story + kabul kriteri + bağlı testler
node scripts/jira.mjs runs <KEY>           # koşum geçmişi
node scripts/jira.mjs steps <KEY>          # manuel adımlar
node scripts/jira.mjs transitions <KEY>    # gidilebilecek statüler
```

## JQL kalıpları

| Soru | JQL |
|---|---|
| Bana atanmış açık işler | `assignee = currentUser() AND resolution = Unresolved ORDER BY updated DESC` |
| Bakım bekleyen case'ler | `project = AJETPSSD AND issuetype = Test AND status = 'Update Pending'` |
| BDD yazılacaklar | `project = AJETPSSD AND issuetype = Test AND status = 'Waiting For BDD'` |
| Belirli kanal | `... AND Channel = 'Mobil-Android'` |
| Belirli modül | `... AND "Modul / Sub Modul" = 'Ödeme'` |
| Son 30 gün değişen | `... AND updated >= -30d` |
| Bir story'nin testleri | `issue in linkedIssues('DIJITALTP-12345')` |
| Otomasyon kapsamı | `project = AJETPSSD AND issuetype = Test AND status in (Automated, 'Automation Review')` |

Boşluk içeren alan adlarını çift tırnakla (`"Modul / Sub Modul"`), değerleri tek tırnakla sar.

## Çalışma şekli

1. Soruyu JQL'e çevir. Belirsizse **sor** — yanlış JQL sessizce yanlış sayı döndürür.
2. Önce `--max 5` ile dene, sonucun doğru şekli tuttuğunu gör, sonra genişlet.
3. Sayı soruluyorsa `--max 1 --json` ile `total` al — tüm sayfaları çekme.
4. Dağılım soruluyorsa `--count-by` kullan.

## Sonucu sunarken

- Önce **tek cümlelik cevap**, sonra tablo. Kullanıcı sayıyı arıyor, tabloyu değil.
- Issue key'lerini `AJETPSSD-30250` şeklinde ver — tıklanabilir hale gelir.
- 20'den fazla sonuçta hepsini listeleme; grupla veya ilk 10'u verip "X tane daha" de.
- Sonuç 0 ise JQL'i göster — kullanıcı filtrenin yanlış olduğunu görebilsin.

## Dikkat

`--count-by` sadece **çekilen** issue'lar üzerinden sayar, `total` üzerinden değil.
Kesin dağılım gerekiyorsa `--max`'i yeterince büyüt veya her değer için ayrı sorgu at.
