---
name: bdd-author
description: Write or revise Gherkin/Cucumber scenarios for Xray Test issues on jira.thy.com, using only step definitions that actually exist. Use when the user asks to write BDD, fill a 'Waiting For BDD' test, convert a manual test case into an automated scenario, update a scenario after a product change, or review Gherkin quality.
---

# BDD yazımı

Xray `Test` issue'larının `Cucumber Scenario` alanına (`customfield_18807`) Gherkin yazarsın.

## Demir kural

**Sadece `docs/step-library.md`'de olan step'leri kullan.**

O katalog, `Automated` statüsündeki 1105 koşan senaryodan çıkarıldı — her satırın Java
tarafında bir step definition'ı **var**. Uydurduğun step `UNDEFINED` olur ve koşum patlar.
"Benzer bir şey yazayım" yoktur; ya katalogdaki ifadeyi birebir kullanırsın, ya da yeni
step olduğunu açıkça söylersin.

Gerekli step katalogda yoksa:

```gherkin
# YENİ STEP — step definition gerekiyor
And I verify the refund fee breakdown on Refund Summary Page
```

ve kullanıcıya hangi step'lerin geliştiriciden isteneceğini listele. Sessizce geçme.

## Kanal uyumu

Katalogdaki `Kanal` sütununa bak. UI ve API tamamen ayrı kelime dağarcığı kullanır:

- UI senaryosu yazıyorsan `Web` / `rIOS` / `And` / `iOS` işaretli step'leri kullan
- API senaryosu yazıyorsan `APIw` / `APIm` işaretli olanları

Karıştırma. `Mock Availability Request` bir UI senaryosunda işe yaramaz.

> Uyarı: `Automated` statüsünde Mobil-Android step'i çok az (5 adet). Android senaryosu
> isteniyorsa önce kullanıcıya söyle — muhtemelen yeni step definition'lar gerekecek.

## Akış

1. **Bağlamı al.** `node scripts/jira.mjs get <KEY>` — mevcut senaryo, kanal, modül.
   Bağlı story varsa `node scripts/jira.mjs story <DIJITALTP-KEY>` ile kabul kriterini oku.
2. **Benzerini bul.** Aynı modülde `Automated` bir case bul ve onun senaryosunu referans al:
   `node scripts/jira.mjs search "project=AJETPSSD AND status=Automated AND summary ~ 'Refund'" --max 5`
   Mevcut desene uymak, sıfırdan yazmaktan her zaman iyidir.
3. **Kataloğu aç.** `docs/step-library.md` — ilgili sayfa/alan bölümüne git.
4. **Yaz.** Aşağıdaki kurallara göre.
5. **Göster.** Kullanıcıya Gherkin'i ver, onay al.
6. **Kaydet.** `--dry-run` → onay → `--confirm`.

## Yazım kuralları

- Senaryo başlığı = issue özeti ile **aynı** (Xray export'u eşleştirir).
- `Given Cookies added successfully` veya `Given I accept all the cookies` ile başla.
- Veri tablosu kullan, değeri step metnine gömme:
  ```gherkin
  And I search for flights by datatable on Booking Page
    | tripType | ports   | dayToFlights | passengers |
    | RT       | BER,SAW | 5,10         | ADULT:1    |
  ```
- Her senaryo tek bir şeyi doğrulasın. Üç farklı kontrol varsa üç senaryo.
- Beklenen sonucu `Then` ile açıkça yaz — "sayfa açılır" değil, "Verify Thank You Page should be opened successfully".
- Türkçe yazma. Gherkin İngilizce.

## Kaydetme

```bash
node scripts/jira.mjs update <KEY> --field.cucumberScenario "$(cat reports/scenario.txt)" --dry-run
node scripts/jira.mjs update <KEY> --field.cucumberScenario "$(cat reports/scenario.txt)" --confirm
node scripts/jira.mjs transition <KEY> --to "BDD Review" --confirm
```

Çok satırlı Gherkin'i önce `reports/` altına dosyaya yaz, sonra oradan oku — kabuk
tırnaklama hataları senaryoyu bozar.

## Kontrol listesi

Kaydetmeden önce:

- [ ] Her step katalogda var mı? (yoksa `# YENİ STEP` işaretli mi?)
- [ ] Step'lerin kanalı issue'nun kanalıyla uyuşuyor mu?
- [ ] Senaryo başlığı issue özetiyle aynı mı?
- [ ] Tek bir davranış mı test ediliyor?
- [ ] Veri tablosundaki sütun adları katalogdaki tablo başlıklarıyla aynı mı?
