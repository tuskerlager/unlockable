/** Browser specific */
// User Agents: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
// Firefox User Agent String Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox#general_form
// List of user agents: https://deviceatlas.com/blog/list-of-user-agent-strings#desktop
const config = require("../../config/config.jsonc");

function detectBrowser() {
  const userAgent = navigator.userAgent; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent

  // if userAgent.includes("Firefox") && userAgent.includes("Chrome") && userAgent.includes("Edg") && userAgent.includes("OPR")) {
  // TODO: test and verify user agent strings; double-check
  return "";
}

function configureBrowser() {
  const browser = detectBrowser();
  const browserConfig = config.browsers[browser] || config.browsers["default"]; // not "unkown" because unknown case is handled
  console.log("Browser configuration: ", browserConfig.description);

  // - handle config logic here based on options in config file.
  // if (browserConfig.property) {}
  // if (browserConfig.action[1] === "default") {}
}

// const browserSettings = configureBrowser();
// const actions = {
//     openFirefoxFeatures: () => console.log("Opening Firefox-specific features..."),
//     openChromeFeatures: () => console.log("Opening Chrome-specific features..."),
//     openSafariFeatures: () => console.log("Opening Safari-specific features..."),
//     defaultAction: () => console.log("Performing default action for unknown browsers...")
//   };