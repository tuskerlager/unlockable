const businessDailyAfrica = require("./site/businessdaily"); // 🇰🇪
const theEastAfrican = require("./site/eastafrican"); // 🇰🇪
const nationAfrica = require("./site/nation"); // 🇰🇪
const theStandard = require("./site/thestandard"); // 🇰🇪
const dailyMonitor = require("./site/monitor"); // 🇺🇬
const newVision = require("./site/newvision"); // 🇺🇬
const theCitizen = require("./site/thecitizen"); // 🇹🇿
const mwananchi = require("./site/mwananchi"); // 🇹🇿
const mwanaspoti = require("./site/mwanaspoti"); // 🇹🇿

const sites = [
  businessDailyAfrica, // https://www.businessdailyafrica.com
  theEastAfrican, // https://www.theeastafrican.co.ke
  nationAfrica, // https://www.nation.africa
  theStandard, // https://www.standardmedia.co.ke // TODO: rework standard based on new test site
  dailyMonitor, // https://www.monitor.co.ug
  newVision, // https://www.newvision.co.ug
  theCitizen, // https://www.thecitizen.co.tz
  mwananchi, // https://www.mwananchi.co.tz
  mwanaspoti, // https://www.mwanaspoti.co.tz
];

// ============= MAIN FUNCTION=============
function main() {
  const tabHostname = window.location.hostname;
  console.log("Current hostname: ", tabHostname); // Debug: log the hostname to check what it returns

  // TODO: add checks here;

  const site = sites.find((site) => site.hostname === tabHostname);
  if (site) {
    console.log("Unlockable: ✅"); // FIXME: should be triggered by result of a function's return
    site.handle();
  } else {
    console.log("Unlockable: ❌");
  }
}

// Call the function when the page is loaded
main();
