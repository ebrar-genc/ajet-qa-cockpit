# AJet QA/SDET Cockpit

AJet booking ve payment ürünlerinin kalite güvence işi için Claude Code çalışma alanı.

Bu repo yalnız **yapılandırma, doküman ve script** tutar. Sır, sertifika ve klonlanmış test
repoları repoya girmez.

## İçerik

| Klasör | İçerik |
|---|---|
| `CLAUDE.md` | Proje talimatı — rol, dil, ortam kuralları |
| `docs/` | Jira alan haritası, step kütüphanesi, domain sözlüğü, konvansiyonlar |
| `scripts/` | `jira.mjs` CLI ve yardımcı modüller |
| `.claude/skills/` | Yedi QA skill tanımı |
| `tools/`, `.tools/` | Node yardımcıları (görsel işleme, PDF okuma) |

## Yeni makinede kurulum

1. Repoyu klonla.
2. `.env.example` dosyasını `.env` adıyla kopyala. Değerleri doldur.
3. Jira Personal Access Token üret: `jira.thy.com` → Profile → Personal Access Tokens.
4. Kurumsal CA paketini `certs/corp-ca-bundle.pem` yoluna koy. Bu dosya repoda yoktur.
5. Bağımlılıkları kur:
   ```bash
   cd tools  && npm install && cd ..
   cd .tools && npm install && cd ..
   ```
6. Kurulumu doğrula:
   ```bash
   node scripts/jira.mjs get AJETPSSD-30250
   ```

## Repoya girmeyen klasörler

| Klasör | Nereden gelir |
|---|---|
| `automation/` | Bitbucket: `MCUR/ajet-testlibrary` |
| `plugin/` | Bitbucket: `YT/test-library-core-agent-plugin` |
| `certs/` | Kurumsal CA paketi, elle kopyalanır |
| `reports/` | Üretilen çıktı |

Klonlama adımları için `docs/automation-clone.md` dosyasına bak.

## Gereksinimler

Node v24, Java 17, Maven 3.9.9, git. `jq` ve Python yoktur.
