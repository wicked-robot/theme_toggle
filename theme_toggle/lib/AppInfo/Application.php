<?php
declare(strict_types=1);

namespace OCA\ThemeToggle\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\Util;

class Application extends App implements IBootstrap {
    public const APP_ID = 'theme_toggle';

    public function __construct() {
        parent::__construct(self::APP_ID);
    }

    public function register(IRegistrationContext $context): void {
        // no-op
    }

    public function boot(IBootContext $context): void {
        // Inject our JS globally
        Util::addScript(self::APP_ID, 'toggle-theme');
    }
}
