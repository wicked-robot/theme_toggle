# Changelog

All notable changes to the **theme_toggle** Nextcloud app are documented in this file.

This project follows the format described at:
https://keepachangelog.com/en/1.1.0/

This project adheres to **Semantic Versioning** (MAJOR.MINOR.PATCH).

---

## [1.0.0] - 2026-02-18
### Added
- Initial release of the Theme Toggle app by Wicked Robot Development.
- Added pill-style theme toggle button to the Nextcloud top navigation bar.
- Toggle automatically placed between the Contacts icon and the User Avatar menu.
- User theme switching between Light and Dark using Nextcloud’s theming system.
- Full compatibility with `theming: enabled-themes` (JSON array) and fallback keys:
  - `accessibility: theme`
  - `theming: user_theme`
  - `core: theme`
- Automatic detection of header layout to ensure toggle placement on various Nextcloud versions.
- Dark‑mode contrast and visibility improvements.
- Lightweight JavaScript injection with no external dependencies.
- Complete documentation, license, and metadata files included.

---