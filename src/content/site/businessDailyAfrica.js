/**
 * Business Daily Africa: www.businessdailyafrica.com
 */

import { removeClassFromElements, removeDivsById } from "../utils/dom.js";

export const hostname = "www.businessdailyafrica.com";
export async function handle() {
  removeClassFromElements("nmgp");
  removeDivsById("paywall");
  console.log("Unlockable: ✅");
}
