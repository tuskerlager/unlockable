// import * as businessDailyAfrica from "./site/businessDailyAfrica";
// import * as theEastAfrican from "./site/theEastAfrican";
// import * as nationAfrica from "./site/nationAfrica";
const businessDailyAfrica = require("./site/businessDailyAfrica");
const theEastAfrican = require("./site/theEastAfrican");
const nationAfrica = require("./site/nationAfrica");

const sites = [
  businessDailyAfrica, //
  theEastAfrican, //
  nationAfrica, //
];

// ============= MAIN FUNCTION=============
function main() {
  const tabHostname = window.location.hostname;
  console.log("Current hostname: ", tabHostname); // Debug: log the hostname to check what it returns

  const site = sites.find((site) => site.hostname === tabHostname);
  if (site) {
    console.log("Unlockable: ✅");
    site.handle();
  } else {
    console.log("Unlockable: ❌");
  }
}

// Call the function when the page is loaded
main();
