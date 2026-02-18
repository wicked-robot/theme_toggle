/* global OC, OCP */
(() => {
  // ----- 0) Inject styling once (pill button + dark-legible text) -----
  function injectStyleOnce() {
    if (document.getElementById('theme-toggle-style')) return;
    const css = `
/* === Theme Toggle pill === */
#header .toggle-theme {
  --tt-border: var(--border, var(--color-border, rgba(0,0,0,0.12)));
  --tt-bg: var(--toggle-bg, var(--color-main-background, #e5e7eb));
  --tt-fg: var(--toggle-fg, var(--text-color, #0f172a));
  --tt-shadow: 0 4px 18px rgba(15, 23, 42, 0.12);

  background: var(--tt-bg);
  color: var(--tt-fg);
  border: 1px solid var(--tt-border);
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--tt-shadow);
  transition: background .2s, color .2s, border-color .2s, transform .05s, box-shadow .15s;
  line-height: 1;
}
#header .toggle-theme:hover { transform: translateY(-1px); }

/* spacing between Contacts and Avatar */
#header #theme-toggle-btn { margin-left: 8px; margin-right: 8px; }

/* ===== Make text readable in ALL dark-mode variants ===== */
:root.dark #header .toggle-theme,
body[data-theme-dark] #header .toggle-theme,
body[data-themes*="dark"] #header .toggle-theme {
  color: #ffffff !important;              /* ensure high contrast */
  --tt-bg: var(--toggle-bg, #2a2a2a);
  --tt-border: var(--border, var(--color-border, #3a3a3a));
}
`;
    const style = document.createElement('style');
    style.id = 'theme-toggle-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ----- 1) Where to place: between Contacts and Settings (avatar) -----
  const findContactsMenu   = () => document.querySelector('#contactsmenu');
  const findSettingsButton = () =>
    document.querySelector('button.header-menu__trigger[aria-controls="header-menu-user-menu"]') ||
    document.querySelector('button[aria-label="Settings menu"][aria-controls="header-menu-user-menu"]') ||
    document.querySelector('#header-menu-user-menu')?.closest('button') || null;

  const findHeaderEnd = () =>
    document.querySelector('#header .header-end') || document.querySelector('.header-end');

  // ----- 2) Detect current dark mode using NC data attributes OR :root.dark -----
  const isDarkNow = () => {
    const b = document.body;
    if (!b) return false;
    if (b.hasAttribute('data-theme-dark')) return true;
    const themes = b.getAttribute('data-themes') || '';
    if (themes.includes('dark')) return true;
    return document.documentElement.classList.contains('dark');
  };

  // ----- 3) Build the button (text + small NC icon) with dynamic label -----
  const createToggleBtn = () => {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.className = 'toggle-theme';
    btn.setAttribute('aria-label', 'Toggle theme');

    // Optional icon (keep it since you asked earlier to restore it)
    const icon = document.createElement('span');
    icon.className = 'icon icon-toggle';

    const label = document.createElement('span');
    const applyLabel = () => {
      if (isDarkNow()) {
        label.textContent = '☀️ Light';
        btn.setAttribute('aria-pressed', 'true');
      } else {
        label.textContent = '🌙 Dark';
        btn.setAttribute('aria-pressed', 'false');
      }
    };
    applyLabel();

    btn.append(icon, label);

    btn.addEventListener('click', async () => {
      try {
        // Flip label immediately for instant feedback
        label.textContent = isDarkNow() ? '🌙 Dark' : '☀️ Light';

        const url = OC.generateUrl('/apps/theme_toggle/toggle');
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'requesttoken': OC.requestToken, 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await res.json();

        // Reload so NC re-applies full theme
        window.location.reload();
      } catch (e) {
        console.error('[theme_toggle] toggle failed', e);
      }
    });

    return btn;
  };

  // ----- 4) Place the button exactly between Contacts and Avatar -----
  const placeBetweenContactsAndAvatar = () => {
    if (document.getElementById('theme-toggle-btn')) return; // already placed
    injectStyleOnce();

    const contacts    = findContactsMenu();
    const settingsBtn = findSettingsButton();
    const headerEnd   = findHeaderEnd();
    if (!headerEnd) return;

    const btn = createToggleBtn();

    if (contacts && contacts.parentElement) {
      contacts.insertAdjacentElement('afterend', btn);
    } else if (settingsBtn && settingsBtn.parentElement) {
      settingsBtn.insertAdjacentElement('beforebegin', btn);
    } else {
      headerEnd.appendChild(btn);
    }
  };

  // ----- 5) Start + retry during header mount -----
  const start = () => {
    placeBetweenContactsAndAvatar();
    let tries = 0;
    const h = setInterval(() => {
      if (document.getElementById('theme-toggle-btn')) { clearInterval(h); return; }
      placeBetweenContactsAndAvatar();
      if (++tries > 20) clearInterval(h);
    }, 200);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

/* === Inject CSS to hide the NC icon inside the pill === */
(function(){
  if (!document.getElementById("theme-toggle-hide-icon-style")) {
    const style = document.createElement("style");
    style.id = "theme-toggle-hide-icon-style";
    style.textContent = "#header .toggle-theme .icon{display:none !important;}";
    document.head.appendChild(style);
  }
})();
