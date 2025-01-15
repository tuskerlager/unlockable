/** Business Daily Africa  */
export const hostname: string = "www.businessdailyafrica.com";
export const title: string = "Business Daily Africa";

// Remove HTML classes from elements
// NOT-EQUAL-TO Removing elements based on classes they have (which is the defined elsewhere)
// i.e., <div class="paragraph-wrapper nmgp"> to <div class="paragraph-wrapper">
function removeClassFromElements(className: string): void {
  document.querySelectorAll(`.${className}`).forEach((element): void => {
    element.classList.remove(className);
  });
}

// Remove divs by their id
// i.e <div class="paywall center color-set-color-" id="paywall" data-site="bd">
function removeDivsById(divId: string): void {
  const divs: NodeListOf<Element> = document.querySelectorAll(`div#${divId}`); // Select all divs with the specific id
  divs.forEach((div): void => {
    div.remove(); // Remove the div from the DOM
  });

  // prettier-ignore
  if (divs.length === 0) { console.log(`Unlocker: No divs found with id: ${divId}`); }
}

export function handle(): void {
  removeClassFromElements("nmgp");
  removeDivsById("paywall");
  console.log("Unlockable: ✅");
}
