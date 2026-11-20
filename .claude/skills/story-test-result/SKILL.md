---
name: story-test-result
description: Write the "Test Results" comment on a story after its functional run - AC table with OK/NOK, observation, evidence number, plus environment, PASS count, out-of-scope line and bugs. Use when the user says test result yaz, story'ye sonuç yaz, or when a story run (manual-run) is finished.
---

# Story Test Results

Story koşumu bitince story'ye **Test Results** yorumu yazılır. Okuyan kişi analist veya story'ye bakan herhangi biri. Bu kişiler domain bilgisine sahip. Yorum story'nin sonucunu tek bakışta verir. Gereksiz açıklama yazma.

Şablon: `.claude/skills/story-test-result/template.html`. Jira yorumları HTML saklar. Tablo görünümü Jira'da doğrulandı (2026-11-20, AJETPSSD-48093).

## Format

1. Kalın başlık: **Test Results**
2. AC tablosu: `AC | Sonuç | Gözlem | Kanıt`
3. Alt maddeler: Ortam · Sonuç (N/N PASS + Execution) · Kapsam dışı · Bug

### Tablo kuralları

- **Her AC bir satır.** AC'yi story'deki numarasıyla yaz (AC1, AC2 ...).
- **Sonuç** renkli yazılır:

  | Sonuç | Renk | Ne zaman |
  |---|---|---|
  | OK | yeşil `#27ae60` | AC doğrulandı |
  | NOK | kırmızı `#c0392b` | AC karşılanmadı, bug var |
  | Kısmen | turuncu `#e67e22` | AC'nin bir kısmı doğrulandı, kalan kısım test edilemedi |
  | Kapsam dışı | gri `#7f8c8d` | AC hiç test edilmedi |

  Doğrulanmayan parça geliştirmeyle ilgili değilse AC "OK" kalır ve o parça "Kapsam dışı" satırına yazılır. Örnek: GA4 yönlendirmesi geliştirmeye dahil değildi.
- **Gözlem:** Tek cümle. Somut değer içerir: proje adı, ID, sayı, sayfa. Yöntem anlatma ("DevTools açıldı", "Network filtrelendi" yazma). NOK ise bug key'ini yaz.
- **Kanıt:** Story ekindeki görsel numarası (`1_...` -> 1). Görsel yoksa `-`.

### Alt maddeler

- **Ortam:** Koşulan ortam ve sürüm. Canlı kontrol yapıldıysa onu da yaz.
- **Sonuç:** `N/N PASS - Execution: AJETPSSD-xxxxx`. FAIL varsa `N PASS, M FAIL`.
- **Kapsam dışı:** Tek satır. Test edilmeyenleri ve kısa nedenini yaz. Kapsam dışı bir şey yoksa satırı kaldır.
- **Bug:** Story'ye bağlı bug'lar, statüleriyle. Yoksa `yok`.

### Yazım

- Türkçe yaz. Tam key yaz (`AJETPSSD-50899`). Uzun tire kullanma.
- Doğrulamadığın bilgiyi yazma. Bir case'in sonucu, koşum notu veya kanıt görseli yoksa o bilgi tabloya girmez.
- Developer görüşü, önem derecesi veya "kritik değil" gibi yorumları yazma. Yalnızca test sonucunu yaz.

## Akış

1. Veriyi topla (mevcut CLI):
   ```bash
   node scripts/jira.mjs story <STORY>                 # AC metni + bağlı testler
   node scripts/jira.mjs exec <EXEC>                   # PASS/FAIL sayısı
   node scripts/jira.mjs run <TEST> --exec <EXEC>      # koşum notu: gözlem cümlesinin kaynağı
   node scripts/jira.mjs attachments <STORY>           # kanıt numaraları
   node scripts/jira.mjs links <STORY>                 # bağlı bug'lar
   node scripts/jira.mjs comments <STORY>              # mevcut Test Results yorumu var mı?
   ```
2. Her case'i bir AC'ye eşle. Eşlemeyi case adımları ve AC metni üzerinden yap. Hiç case'i olmayan AC "Kapsam dışı" olur. Eşleme belirsizse kullanıcıya sor.
3. HTML'i `reports/test-results/<STORY>.html` olarak yaz. Uzun tire kontrolü yap.
4. Taslağı kullanıcıya tablo olarak göster. `comment <STORY> --body @reports/test-results/<STORY>.html --dry-run` çıktısını kontrol et.
5. Kullanıcı onaylarsa `--confirm` ile yaz. Story'de zaten Test Results yorumu varsa yeni yorum açma, `--id <yorumId>` ile güncelle.
6. `comments <STORY>` ile doğrula. Kullanıcıdan Jira'da tablonun düzgün göründüğünü teyit etmesini iste.

**Story statüsünü değiştirme.** Statüyü kullanıcı değiştirir.

## Örnek (AJETPSSD-48093, Web Firebase ortam ayrımı)

| AC | Sonuç | Gözlem | Kanıt |
|---|---|---|---|
| AC1 | OK | test01 ilk Firebase isteğinden itibaren ajet-nonprod kullanıyor; appId Web NonProd kaydıyla aynı. Canlı site canlı projede. | 1, 2 |
| AC2 | OK | Remote Config isteği ajet-nonprod projesine gidiyor. | - |
| AC3 | OK | Performance ölçümleri ajet-nonprod Web NonProd kaydında. | 3 |

- Ortam: web-test01 (V17), canlı kontrol: www.ajet.com
- Sonuç: 4/4 PASS - Execution: AJETPSSD-50899
- Kapsam dışı: GA4 yönlendirmesi (geliştirme kapsamında değil)
- Bug: yok
