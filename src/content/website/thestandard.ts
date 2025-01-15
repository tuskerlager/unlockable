/** The Standard (KE) */
export const hostname = "www.standardmedia.co.ke";
export const title = "The Standard";

// --- Remove elements based on classes they have from a parent element
// NOT-EQUAL-TO Removing classes from an element (as defined elsewhere)
function removeElementsByClass(
  parentElement: Element | Document, classArray: readonly string[]): void {
  classArray.forEach((className: string): void => {
    const elementsToRemove: NodeListOf<Element> =
      parentElement.querySelectorAll(`.${className}`);
    elementsToRemove.forEach((element: Element): void => {
      element.remove();
    });
  });
}

export async function handle(): Promise<void> {
    const url: string = window.location.href; // Get the current page URL
  
    try {
      // Fetch the raw HTML source of the page
      const response: Response = await fetch(url, { method: "GET", headers: { "Content-Type": "text/html" }, } );
      if (!response.ok) { console.error( "Unlockable: Failed to fetch page source:", response.statusText); return; }
  
      const rawHTML: string = await response.text(); // Get the HTML as plain text
      if (!rawHTML) { console.error("Unlockable: No HTML content returned."); return; }
  
      // Parse the raw HTML into a DOM structure to manipulate it
      const parser: DOMParser = new DOMParser();
      const doc: Document = parser.parseFromString(rawHTML, "text/html");
  
      // Find the div with the ID "js-enabled"
      const jsEnabledDiv: HTMLElement | null = doc.getElementById("js-enabled");
      if (!jsEnabledDiv) { console.error("Unlockable: 'js-enabled' div not found."); return; }
      const classesToRemove: readonly string[] = ["subscribe-mid-art"] as const;
      removeElementsByClass(jsEnabledDiv, classesToRemove);
  
      // h1, and the first <small> with class text-muted i.e author tag
      // FIXME: this logic doesn't guarantee first or just one; rework
      const heading1: HTMLHeadingElement | null = doc.querySelector("h1");
      const authorTag: Element | null = doc.querySelector("small.text-muted");
  
      // Combine the found elements and the article content
      let combinedContent: string = "";
      if (heading1) combinedContent += heading1.outerHTML;
      if (authorTag) combinedContent += authorTag.outerHTML;
      combinedContent += jsEnabledDiv.outerHTML;
  
      // Open a new tab and render the edited HTML
      const newTab: Window | null = window.open(); // Open a new blank tab
      if (newTab) {
        newTab.document.open(); // Open the document for writing
        newTab.document.write(combinedContent); // Write the edited HTML into the new tab
        newTab.document.close(); // Close the document
      } else {
        console.error("Unlockable: Failed to open a new tab!");
      }
    } catch (error) {
      console.error( "Unlockable: Error fetching or editing page source:", error );
    }
  }
  