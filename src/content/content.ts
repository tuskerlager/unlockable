/** Main module */
import { Website } from "./types";
import { configManager, type SiteConfig } from "../config/config";

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
function main(): void {
  const tabHostname: string = window.location.hostname;

  // check if enabled in config/options/popup
  const website: Website | undefined = websites.find(
    (website: Website): boolean => {
      return website.hostname === tabHostname;
    }
  );

  // prettier-ignore
  if (website) { website.handle(); } else { ; } // no-op }
}

main();
