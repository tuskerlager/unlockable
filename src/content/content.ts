/** Main module */
import { Website } from "./types";
// TODO: import from config with enabled/disabled
import * as businessdailyafrica from "./website/businessdaily";
import * as theEastAfrican from "./website/eastafrican";
import * as nationAfrica from "./website/nation";
import * as mwananchi from "./website/mwananchi";
import * as mwanaspoti from "./website/mwanaspoti";
import * as dailyMonitor from "./website/monitor";

/** Websites */
const websites: Website[] = [
  businessdailyafrica, // www.businessdailyafrica.com
  theEastAfrican, // www.theeastafrican.co.ke
  nationAfrica, // nation.africa
  mwananchi, // www.mwananchi.co.tz
  mwanaspoti, // www.mwanaspoti.co.tz
  dailyMonitor, // www.monitor.co.ug
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
