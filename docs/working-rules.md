# Çalışma kuralları

Ebrar'ın Claude'a verdiği kalıcı kurallar. Kaynak: oturumlardaki geri bildirimler (2026-11-18 / 2026-11-20).
Claude'un yerel hafızası bilgisayarlar arasında taşınmaz. Bu dosya repoda olduğu için iki bilgisayarda da geçerlidir.
Skill dosyaları detayı verir. Bu dosya özettir. Çelişki olursa yeni tarihli kural geçerlidir.

## Yazım

- **Uzun tire kullanma** (U+2014 ve U+2013 karakterleri). Jira, dosya, commit ve sohbet dahil. Kısa tire (-) kullan.
- Jira'ya yazılan açıklama, not ve yorumda tam kart ID'si yaz: `AJETPSSD-49217`. Yalnızca numara yazma.
- Doğrulamadığın bilgiyi yazma.

## Story ve test akışı

Döngü: senaryo yazımı -> koşum (`manual-run`) -> story kanıtı -> Test Results (`story-test-result`) -> Tempo (`tempo-log`).

- **Story statüsünü değiştirme.** Ebrar değiştirir. "Kapatalım" dese de statüye dokunma.
- Sprint fonksiyonel set ve execution'larda kanal ayrımı yok: WEB, AND, IOS aynı set ve execution'a girer. Regresyonda kanal ayrımı var.
- Set ve execution story'lere bağlanır: Execution -> Story `Tests`, Set -> Story `Allocated`, Execution <-> Set `Allocated`.
- Kanıtı olmayan case'i PASS yazma. Test edilemeyen case'i kullanıcıyla konuşup kapsam dışı bırak (execution, set ve story'den çıkar).

## Kanıt görselleri

- **Görseli küçültme.** Orijinal kalitede yükle. Çerçeve: `node tools/mark.mjs <in> <out.png> x1,y1,x2,y2`.
- Testin amacını kanıtlayan öğeyi **kırmızı çerçeve** ile işaretle. Siyah zeminli metin kutusu koyma.
- Adlandırma: koşum kanıtı `1_<amaç>_ok.png`, hata görseli `_nok`. Story eki: `1_`, `2_` ... sırayla, story ID'si yazmadan.
- Yüklemeden önce görseli aç: çerçeve yerinde mi, yazı okunuyor mu?
- **Gizlilik:** Görselde token, Authorization başlığı, cookie, gizli veya canlı API anahtarı, şifre, canlıya giden istek, kişisel veri (TC kimlik, telefon, e-posta, gerçek müşteri PNR'ı, kart) veya hesap kimliği varsa `--blur x1,y1,x2,y2` ile bulanıklaştır ya da sor. Firebase web apiKey ve App ID kritik değildir.

## Koşum notu

- Kısa maddeler. Anahtar değer ve sonuç **kalın**. Dolgu yok.
- FAIL notu bug kartı yapısında: Test Verileri, Steps, Expected, Actual, Ekler.
- Birçok özellik CMS'e bağlı. FAIL'de olası CMS bağımlılığını notta belirt.

## Bug

- Ebrar'ın istediği bug'ı onay beklemeden aç (`--confirm`). Bilinmeyen veri (versiyon, cihaz, squad) varsa sor.
- `REG.2.2.1` label'ı koyma. Related Test Execution alanını kullanıcı söylemezse boş bırak. Keşif bulgusunda QA Process = `Keşif`.
- Test Verileri'ne yalnızca tekrar üretim için gereken bilgiyi yaz. PNR yazıyorsan soyadı da yaz. Uygulama versiyonunu her zaman yaz.
- Mobil cihaz: iOS **iPhone 13**, Android **Samsung Galaxy A32**.
- **Bug havada kalmaz:** Story testinde çıktıysa story'ye **ve** execution'a bağla. Story'siz ise yalnızca execution'a bağla. Execution bağlantısı `Allocated`. Story bağlantı tipi ilk gerçek bug'da Ebrar ile belirlenecek (aday: `Relates`). Unutulursa hatırlat.

## Tempo

- Faturalandırılacak Şirket **her zaman TKAJ**. Asla değiştirme.
- Servis **yalnızca** web 5501, Android 5502, iOS 5503. Başka kod kullanma.
- Saati Ebrar söyler veya zorluğa göre öneri yapılır, onaysız girilmez.
- Test Set'e kayıt girilmez: senaryo yazımı execution'a. Kapalı veya `Ready For Release` issue'ya kayıt girilmez.
- Ortak iOS ve Android işi tek kayıt. Servisi kayıttan kayda dönüşümlü seç.
- Açıklama 1-2 cümle, tam key'li, sayı ve kapsam içerir.

## Ortam

- Android cihaz koşumu: `scripts/device.mjs` (adb, `.tools/platform-tools/`). Cihaz Samsung SM-A325F, paket `com.ajet.mobile.preprod`. iOS Windows'tan sürülemez.
- Ev bilgisayarında `certs/` yok ve gerekmez. Kurumsal ağdaki bilgisayarda gerekir.

## Git (iki bilgisayar)

- Oturum başında `git pull`.
- Gün sonunda değişiklikleri göster, onayla commit + push. Gerekirse konuya göre birkaç commit.
- Commit mesajı sonradan okunduğunda neyin ve neden değiştiğini anlatır.
