/** */

/** Website */
export interface Website {
    hostname: string; // e.g. "www.businessdailyafrica.com"
    title: string; // e.g. "Business Daily Africa"
    handle: () => Promise<void> | void; // a handler function specific to the website/hostname
}

/** Browser specific */
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