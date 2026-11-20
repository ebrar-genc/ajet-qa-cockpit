---
name: tempo-log
description: Log daily work to Tempo (worklog) on jira.thy.com - list logged hours and gaps, draft entries, add or delete worklogs with the right company and service. Use when the user says tempo, worklog, log gir, saat gir, günü kapat, or asks how many hours are missing.
---

# Tempo kaydı

Kullanıcı her gün Tempo'ya iş kaydı girer. Günlük hedef **8 saat**. Kaydı `scripts/jira.mjs tempo` ile gir.

## Komutlar

```bash
node scripts/jira.mjs tempo list                                  # bu hafta: kayıtlar + günlük eksik saat
node scripts/jira.mjs tempo list --from 2026-11-16 --to 2026-11-20
node scripts/jira.mjs tempo add <KEY> --hours 2.5 --servis ios --comment "..." --dry-run
node scripts/jira.mjs tempo add <KEY> --hours 2.5 --servis ios --comment "..." --confirm
node scripts/jira.mjs tempo delete <tempoWorklogId> --confirm     # id: tempo list çıktısındaki ID
```

`--date` verilmezse bugün (İstanbul saati) kullanılır. Şirket her zaman `TKAJ` olur. CLI başka şirketi ve 3 servis dışındaki kodu reddeder.

## Kurallar

1. **Saat dağılımı:** Kullanıcı saat söylerse onu kullan. Söylemezse eksik saati işlerin zorluğuna göre böl ve öneri olarak göster. Zorluk ölçüsü: senaryo sayısı, koşum sayısı, FAIL ve bug sayısı, inceleme gerektiren story. Kullanıcı onaylamadan girme.
2. **Faturalandırılacak Şirket: her zaman `TKAJ`** (AJet Hava Taşımacılığı). **Asla değiştirme.** Geçmiş kayıtlarda başka şirket görsen de kullanma.
3. **Servis: yalnızca bu 3 servis.** **Başka servis kodu asla kullanma.** Backend, CMS, etkinlik veya başka kod kullanma.

   | Kanal | `--servis` | Kod |
   |---|---|---|
   | Web (ajet.com) | `web` | 5501 |
   | Mobil Android | `android` | 5502 |
   | Mobil iOS | `ios` | 5503 |

   - İş bu 3 kanala uymuyorsa (backend, CMS, etkinlik): en yakın kanalı seç veya kullanıcıya sor. Başka kod girme.
   - iOS ve Android ortak iş tek kayıtta girilir. Bölme. Servisi sırayla değiştirerek dengele: bir ortak kayıtta `ios` seçtiysen sonraki ortak kayıtta `android` seç. Son ortak kaydın servisini `tempo list` çıktısından bul. Kullanıcı servis söylerse onu kullan.
4. **Issue:** Kaydı işin yapıldığı issue'ya gir. Örnek: story, bug, test execution, etkinlik kartı (`GE-12`).
   - **Test Set'e kayıt girilmez.** Senaryo yazımını ilgili **Test Execution**'a gir. Açıklamada "senaryo yazıldı" de ve story key'ini yaz.
   - Kapalı issue'ya kayıt girilmez (aşağıdaki teknik nota bak).
5. **Yorum:** Türkçe, 1-2 cümle. Hem kullanıcıya not olsun hem bakan kişi anlasın. Şunları yaz:
   - Hangi story veya bug. **Tam key yaz** (`AJETPSSD-49217`), yalnızca numara (`49217`) yazma. Tam key Jira'da bağlantıya dönüşür.
   - Ne yapıldı: inceleme, senaryo yazımı, koşum, retest, bug kartı
   - Sayı ve kapsam: kaç senaryo, hangi kanallar, hangi akışlar, PASS/FAIL sayısı
   - Doğrulamadığın bilgiyi yazma. Örnek: FAIL'in hangi bug'a gittiğini bilmiyorsan yazma.
   - Uzun tire kullanma.
   Kullanıcının geçmiş yorumlarından örnekler:
   - `bugfix retest`
   - `senaryo koşumu, bug kartları iletilmesi`
   - `ilgili story inceleme, ios-and bugfix testleri`
   - `iOS ve Android Firebase ortam ayrımı: senaryolar güncellendi, koşuldu, story'ye kanıt eklendi`
6. **Sıra:** `--dry-run` çıktısını göster. Kullanıcı süreyi ve işi açıkça verdiyse `--confirm` ile gir. Sonra `tempo list` ile doğrula.

## Günü kapatma akışı

Kullanıcı "günü kapat" veya "tempo gir" dediğinde:

1. `tempo list --from <gün> --to <gün>` ile girilen saati ve eksik saati göster.
2. O günün işlerini topla:
   - Bu oturumda birlikte yaptığımız işler
   - O gün güncellenen issue'lar: `search "updatedBy = currentUser() AND updated >= startOfDay()"` benzeri bir sorgu
   - O gün koşulan Xray koşumları
3. İş listesini tablo olarak öner: issue, servis, yorum, saat (zorluğa göre öneri). Her satırın kanıtını kısaca yaz.
4. Kullanıcı saatleri onaylar veya değiştirir. Toplamın 8 saati geçip geçmediğini kontrol et ve söyle.
5. Kayıtları gir ve `tempo list` ile doğrula.

## Teknik notlar

- Okuma: `GET /rest/tempo-timesheets/3/worklogs` ve `GET /rest/tempo-core/1/user/schedule`.
- Yazma: `POST /rest/tempo-timesheets/4/worklogs`. `worker` alanı kullanıcı **key** değeridir (`/rest/api/2/myself` -> `key`), kullanıcı adı değildir.
- Servis listesi: `/rest/scriptrunner/latest/custom/serviceList` (JSONP biçiminde, yaklaşık 1950 kayıt).
- Tempo hız sınırı uygular (HTTP 429). Toplu kayıtta istekler arasında kısa bekle.
- **Bağlantı hatası (ECONNRESET):** Kayıt oluşmamış olabilir veya oluşmuş olabilir. Tekrar girmeden önce `tempo list` ile kontrol et. Çift kayıt girme.
- **`Ready For Release` statüsündeki issue'ya da kayıt girilmez** (2026-11-20, AJETPSSD-47577). Kayıt ilgili Test Execution'a yönlendirildi, açıklamada story key'i yazıldı.
- **Kapalı (Closed) issue'ya kayıt girilmez:** HTTP 403 "does not have permission to log work on destination project". Taslakta kapalı issue varsa kullanıcıya önceden söyle ve yerine açık bir issue öner. Örnek (2026-11-19): kapalı bug retesti yerine ilgili açık story'ye "task inceleme, developer'la desk check" girildi.
