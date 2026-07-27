# vanbeirsventures.com

Static website for Van Beirs Ventures, hosted on Bunny.net (Storage Zone `vanbeirsventures` / 1692144,
Pull Zone 6222553, https://www.vanbeirsventures.com).

**Every push to `main` deploys automatically** via `.github/workflows/deploy.yml` (uploads all files to the
Bunny storage zone and purges the CDN cache). Commits containing `[skip deploy]` are not deployed.

Files deleted from the repo are not auto-deleted from the storage zone.

Built from the org's `bunny-site-template`. See that repo's README for the new-site onboarding checklist.

Pipeline verified end-to-end on 27.07.2026.
