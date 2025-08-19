/** Main module */
import { Website } from "./types";
import { configManager, SiteConfig } from "../config/config";

// TODO: import from config with enabled/disabled
import * as businessDailyAfrica from "./website/businessdaily";
import * as theEastAfrican from "./website/eastafrican";
import * as nationAfrica from "./website/nation";
import * as theStandard from "./website/thestandard";
import * as dailyMonitor from "./website/monitor";
import * as newVision from "./website/newvision";
import * as theCitizen from "./website/thecitizen";
import * as mwananchi from "./website/mwananchi";
import * as mwanaspoti from "./website/mwanaspoti";

/** Websites */
const websites: Website[] = [
  businessDailyAfrica, // www.businessdailyafrica.com
  theEastAfrican, // www.theeastafrican.co.ke
  nationAfrica, // nation.africa
  theStandard, // www.standardmedia.co.ke
  dailyMonitor, // www.monitor.co.ug
  newVision, // www.newvision.co.ug
  theCitizen, // www.thecitizen.co.tz
  mwananchi, // www.mwananchi.co.tz
  mwanaspoti, // www.mwanaspoti.co.tz
];

/** */
async function main(): Promise<void> {
  await configManager.loadConfig();
  const tabHostname: string = window.location.hostname.replace(/^www\./, "");

  const site: SiteConfig | undefined = configManager.getSite(tabHostname);
  if (!site?.enabled) {
    return;
  }

  const website: Website | undefined = websites.find((w) => w.hostname === tabHostname || w.hostname === `www.${tabHostname}`);
  if (website) {
    website.handle();
  }
}

main();
