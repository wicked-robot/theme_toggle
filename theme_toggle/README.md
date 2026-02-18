# Theme Toggle (Nextcloud App)

A lightweight enhancement that adds a modern Light/Dark theme toggle to the Nextcloud top bar.

- Author: Wicked Robot Development  
- Created: 2026‑02‑18  
- Version: 1.0.0  
- Minimum Nextcloud Version: 25  
- License: AGPL‑3.0‑only  
- App ID: theme_toggle  

Note about Dark Mode:  
Theme Toggle switches your personal Nextcloud theme between Light and Dark modes using Nextcloud’s built‑in theming system.  
It preserves your preference across sessions and works with the default theme, custom themes, and accessibility mode without any server configuration.

---

## Overview

Theme Toggle adds a clean, pill‑style toggle button directly into the Nextcloud header.  
The toggle appears between the Contacts icon and the User Avatar menu, offering instant access to switch between Light and Dark mode.

The app detects which internal preference key your specific Nextcloud version uses, including:

- theming: enabled-themes (newer versions)
- accessibility: theme
- theming: user_theme
- core: theme

This ensures maximum compatibility across a wide range of Nextcloud releases.

---

## Features

- Pill-style theme switcher  
- Automatic placement inside the navigation bar  
- Reads and updates the correct user-theme storage key  
- Compatible with custom themes  
- No server-level access required  
- Lightweight with no external dependencies  

---

## Installation

Theme Toggle is simple to install — no command line access is required.

### 1. Upload the app

Upload the entire folder named: theme_toggle into your Nextcloud installation’s `apps/` directory.

Typical installation paths:

- Shared hosting:  
  `/home/<username>/public_html/apps/theme_toggle/`

- Self‑hosted Linux installation:  
  `/var/www/nextcloud/apps/theme_toggle/`

### 2. Activate the app

1. Log in as an admin  
2. Go to: **Settings → Apps**  
3. Open the **Customization** category  
4. Click **Enable** on “Theme Toggle”

Once activated, the toggle button will automatically appear in the top bar.

---

## How It Works

When a user clicks the toggle:

1. The label instantly updates (Dark → Light or Light → Dark)  
2. The app updates the corresponding Nextcloud user preference  
3. The page reloads to apply the theme globally  
4. The choice persists across logins and devices  

---

## Compatibility

- Works with Nextcloud 25+  
- Supports default theming, Theming app, Accessibility theming, and custom color schemes  
- No interference with other header items or apps  

---

## Troubleshooting

**The toggle does not appear:**  
- Verify the folder name: `theme_toggle`  
- Perform a hard browser refresh (Ctrl + Shift + R)  
- Ensure the app is enabled in **Settings → Apps**

**Theme does not change:**  
- Your server administrator may have enforced a global theme  
- Personal theme switching may be restricted for your user role  

---

## License

This project is licensed under the GNU Affero General Public License v3.0.  
See the `LICENSE` file for the full text.

---

## About the Author

Wicked Robot Development  
Focused on building clean, modern enhancements for Nextcloud and self‑hosted platforms.
