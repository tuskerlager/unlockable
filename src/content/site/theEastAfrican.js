/** The East African www.theeastafrican.co.ke */

import { removeClassFromElements, removeDivsById } from "../utils/dom.js";
export const hostname = "www.theeastafrican.co.ke";
export async function handle() {
  removeClassFromElements("nmgp");
  removeDivsById("paywall");
  console.log("Unlockable: ✅");
}
