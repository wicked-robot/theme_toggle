<?php
declare(strict_types=1);

namespace OCA\ThemeToggle\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IUserSession;
use OCP\IConfig;

class ToggleController extends Controller {
    public function __construct(
        string $appName,
        IRequest $request,
        private IUserSession $userSession,
        private IConfig $config
    ) {
        parent::__construct($appName, $request);
    }

    /**
     * POST /apps/theme_toggle/toggle
     *
     * On your instance the user setting is:
     *   app=theming, key=enabled-themes  with values like ["dark"] or ["light"]
     *
     * We will:
     *   1) Try that first (JSON array).
     *   2) Fall back to other known variants that some NC versions use:
     *        - accessibility.theme = dark|light
     *        - theming.user_theme  = dark|light
     *        - core.theme          = dark|light (legacy/rare)
     */
    public function flip(): DataResponse {
        $user = $this->userSession->getUser();
        if (!$user) {
            return new DataResponse(['error' => 'not-logged-in'], 401);
        }
        $uid = $user->getUID();

        // --- 1) Preferred for your install: theming.enabled-themes (JSON array)
        $json = $this->config->getUserValue($uid, 'theming', 'enabled-themes', '');
        if ($json !== '') {
            // Expect ["dark"] or ["light"]
            $arr = json_decode($json, true);
            $current = (is_array($arr) && isset($arr[0])) ? strtolower((string)$arr[0]) : 'light';
            $next = ($current === 'dark') ? 'light' : 'dark';
            $this->config->setUserValue($uid, 'theming', 'enabled-themes', json_encode([$next]));
            return new DataResponse(['theme' => $next, 'app' => 'theming', 'key' => 'enabled-themes']);
        }

        // --- 2) Try other common variants (string values)
        $candidates = [
            ['app' => 'accessibility', 'key' => 'theme'],
            ['app' => 'theming',       'key' => 'user_theme'],
            ['app' => 'core',          'key' => 'theme'],
        ];

        $current = null; $usedApp = null; $usedKey = null;
        foreach ($candidates as $c) {
            $val = $this->config->getUserValue($uid, $c['app'], $c['key'], '');
            if ($val !== '') {
                $current = strtolower((string)$val);
                $usedApp = $c['app'];
                $usedKey = $c['key'];
                break;
            }
        }

        if ($usedApp === null) {
            // If nothing exists yet, initialize preferred JSON key to dark
            $this->config->setUserValue($uid, 'theming', 'enabled-themes', json_encode(['dark']));
            return new DataResponse(['theme' => 'dark', 'app' => 'theming', 'key' => 'enabled-themes']);
        }

        $next = ($current === 'dark') ? 'light' : 'dark';
        $this->config->setUserValue($uid, $usedApp, $usedKey, $next);

        return new DataResponse(['theme' => $next, 'app' => $usedApp, 'key' => $usedKey]);
    }
}
