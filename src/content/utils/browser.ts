/** Browser specific */
import { BrowserConfig, Browsers } from '../types';
import config from '../../config/config.jsonc';

function detectBrowser(): string {
    const userAgent: string = navigator.userAgent;
    
    // TODO: test and verify user agent strings; double-check
    return "";
}

function configureBrowser(): void {
    const browser: string = detectBrowser();
    const browserConfig: BrowserConfig = config.browsers[browser as keyof Browsers] || config.browsers["default"];
    console.log("Browser configuration: ", browserConfig.description);

    // - handle config logic here based on options in config file.
    // if (browserConfig.property) {}
    // if (browserConfig.action[1] === "default") {}
}

// Types for the browser configurations
interface BrowserActions {
    openFirefoxFeatures: () => void;
    openChromeFeatures: () => void;
    openSafariFeatures: () => void;
    defaultAction: () => void;
}

// Example of typed actions object
const browserActions: BrowserActions = {
    openFirefoxFeatures: (): void => console.log("Opening Firefox-specific features..."),
    openChromeFeatures: (): void => console.log("Opening Chrome-specific features..."),
    openSafariFeatures: (): void => console.log("Opening Safari-specific features..."),
    defaultAction: (): void => console.log("Performing default action for unknown browsers...")
};

// You'll need to create a types.ts file with these interfaces:
/*
export interface BrowserConfig {
    description: string;
    property?: boolean;
    action?: string[];
    // Add other properties as needed based on your config.jsonc
}

export interface Browsers {
    firefox?: BrowserConfig;
    chrome?: BrowserConfig;
    safari?: BrowserConfig;
    default: BrowserConfig;
    [key: string]: BrowserConfig | undefined;
}
*/