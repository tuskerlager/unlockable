/** Business Daily Africa: www.businessdailyafrica.com */
export const hostname = "www.businessdailyafrica.com";

// Remove HTML classes from elements
// NOT-EQUAL-TO Removing elements based on classes they have (which is the defined elsewhere)
// i.e., <div class="paragraph-wrapper nmgp"> to <div class="paragraph-wrapper">
function removeClassFromElements(className) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.classList.remove(className);
  });
}

// Remove divs by their id
// i.e <div class="paywall center color-set-color-" id="paywall" data-site="bd">
function removeDivsById(divId) {
  const divs = document.querySelectorAll(`div#${divId}`); // Select all divs with the specific id
  divs.forEach((div) => {
    div.remove(); // Remove the div from the DOM
  });

  if (divs.length === 0) {
    console.log(`📰 Paywaller: No divs found with id: ${divId}`);
  }
}

// Handle the unlocking of the page; handle is the default/main function for every site
export async function handle() {
  removeClassFromElements("nmgp");
  removeDivsById("paywall");
  console.log("Unlockable: ✅");
}
