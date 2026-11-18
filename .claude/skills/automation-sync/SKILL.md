---
name: automation-sync
description: Bridge Xray and the Java/Cucumber/Selenium automation repo in automation/ — export .feature files from Jira, add new scenarios to the repo, map Gherkin steps to Java step definitions, and find missing ones. Use when the user wants to automate a test case, add a scenario to the automation repo, sync Jira and code, or check which steps lack a definition.
---

# Otomasyon senkronizasyonu

Xray ile `automation/` altındaki Java + Cucumber + Selenium repo'su arasındaki köprü.

## Repo yoksa

`automation/` boşsa kullanıcıdan Bitbucket URL'ini iste:

```bash
git clone <bitbucket-url> automation
```

Klonlandıktan sonra **önce yapıyı keşfet**, varsayma:

```bash
find automation -name "*.feature" | head -20
find automation -name "*.java" -path "*step*" | head -20
cat automation/pom.xml | head -40
```

Nerede `.feature` duruyor, step definition'lar hangi pakette, runner nasıl çalışıyor —
bunları öğrendikten sonra `docs/automation-repo.md` dosyasına yaz ki bir daha keşfetme.

## Xray → repo

```bash
node scripts/jira.mjs feature AJETPSSD-30250 --out reports/x.feature
node scripts/jira.mjs feature AJETPSSD-30250 AJETPSSD-28473 --out reports/batch.feature
```

Çıktı `@AJETPSSD-30250` ve bağlı tüm `@DIJITALTP-*` requirement tag'lerini taşır.
Bir testin 70'ten fazla requirement tag'i olabilir — repo'ya koyarken bunları
koruyup korumayacağınız ekip kararı; mevcut `.feature` dosyalarına bak, onlara uy.

`Feature: Default` başlığı Xray'in varsayılanıdır; repo'da anlamlı bir feature adıyla
değiştir.

## Repo → Xray

Repo'da yazılan/değiştirilen senaryoyu ilgili Test issue'ına geri yaz:

```bash
node scripts/jira.mjs update <KEY> --field.cucumberScenario "$(cat path/to/scenario.txt)" --dry-run
```

Senaryo gövdesini `Feature:` satırı ve tag'ler olmadan, sadece `Scenario:` altındaki
step'ler olarak yaz — Xray alanı böyle saklıyor.

## Step eşlemesi — en kritik iş

Yeni bir senaryonun koşabilmesi için her step'in Java tarafında bir karşılığı olmalı.

```bash
# Repo'daki tanımlı step'leri çıkar
grep -rhoP '@(Given|When|Then|And)\("\K[^"]+' automation/ --include=*.java | sort -u > reports/defined-steps.txt
wc -l reports/defined-steps.txt
```

Sonra `docs/step-library.md` ile karşılaştır. Kütüphane Xray'deki **koşan** senaryolardan
üretildiği için ikisi büyük ölçüde örtüşmeli; örtüşmüyorsa:

- Kütüphanede var, repo'da yok → farklı repo/branch'e bakıyor olabilirsin
- Repo'da var, kütüphanede yok → henüz kullanılmamış step, **kullanılabilir**

Repo'daki step'ler regex/cucumber-expression içerir (`{string}`, `(\d+)`), kütüphanedeki
step'ler somut metindir. Eşleştirirken bunu hesaba kat — birebir string karşılaştırması
yanlış sonuç verir.

## Yeni senaryo ekleme akışı

1. `bdd-author` ile Gherkin'i yaz (kütüphaneye sadık).
2. Eksik step varsa listele — geliştiriciden step definition iste veya kendin yaz.
3. `.feature` dosyasını repo'da doğru pakete koy.
4. Derle: `cd automation && mvn -q test-compile`
5. Koş (hedefli): `mvn test -Dcucumber.filter.tags="@AJETPSSD-30250"`
6. Geçerse Xray'de statüyü `Automated`'a çek.

**Derlemeden commit etme.** `mvn -q test-compile` geçmiyorsa senaryo da geçmez.

## Dikkat

- `automation/` kendi git remote'una sahip, bu repo'nun `.gitignore`'unda. Oraya commit
  atarken hangi branch'te olduğunu kontrol et, `main`'e doğrudan push etme.
- Java 17 ve Maven 3.9.9 kurulu. Gradle yok.
