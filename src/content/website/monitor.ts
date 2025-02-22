/** Daily Monitor (UG) */
export const hostname: string = "www.monitor.co.ug";
export const title: string = "Daily Monitor";

export async function handle(): Promise<void> {
    const url: string = window.location.href; // Get the current page URL
  
    try {
      // Fetch the raw HTML source of the page
      const response: Response = await fetch(url, { method: "GET", headers: { "Content-Type": "text/html",},} );
      if (!response.ok) { console.error( "Unlockable: Failed to fetch page source:", response.statusText ); return; }
      const rawHTML: string = await response.text(); // Get the HTML as plain text
  
      // Parse the HTML using DOMParser
      const parser: DOMParser = new DOMParser();
      const doc: Document = parser.parseFromString(rawHTML, "text/html"); // Parse the raw HTML into a DOM Document
  
      // Check if the page contains the <aside> with id "paywall"
      const paywallAside: Element | null = doc.querySelector("aside#paywall");
      if (!paywallAside) { return; } // If no paywall aside, exit without making changes}
  
      // Find and handle the <header> and <nav> elements; removes annoying whitespace before body; nav left in place
      const header: Element | null = doc.querySelector("header.page-grid-header");
      if (header) {
        const nav: Element | null = header.querySelector("nav.main-nav"); // Find the <nav> inside the header
        if (nav) {
          // Remove the header and insert the copied nav in its place
          header.remove(); // Delete the header
          doc.body.insertBefore(nav, doc.body.firstChild); // Insert the nav at the beginning of the body
        } else {
          console.error( "Unlockable: No <nav> with class 'main-nav' found inside the header.");
        }
      } else {
        console.error( "Unlockable: No <header> with class 'page-grid-header' found." );
      }
  
      // Find all divs with classes "text-block blk-txt"; ideally should be just 1
      const textBlockDivs: NodeListOf<Element> = doc.querySelectorAll("div.text-block.blk-txt");
  
      // Loop through each div and remove the "nmgp" class if present
      textBlockDivs.forEach((div: Element) => {
        const divsWithClass: NodeListOf<Element> = div.querySelectorAll("div.paragraph-wrapper.nmgp");
  
        if (divsWithClass.length > 0) {
          divsWithClass.forEach((innerDiv: Element) => innerDiv.classList.remove("nmgp"));
        }
      });
  
      // Delete certain divs given the IDs in an array
      const idsToDelete: string[] = ["article-general-spinner", "paywall", "datawall"];
      idsToDelete.forEach((id: string) => {
        const divToDelete: HTMLElement | null = doc.getElementById(id); // Find the div by ID
        if (divToDelete) { divToDelete.remove(); // Remove the div from the DOM
        } else {
          console.log(`Unlockable: No div found with id: ${id}`);
        }
      });
  
      // Delete certain divs by their class names
      const classNamesToDelete: string[] = ["subscription-status-recommendation"];
      classNamesToDelete.forEach((className: string) => {
        const divs: NodeListOf<Element> = doc.querySelectorAll(`div.${className}`); // Find divs with the class
        divs.forEach((div: Element) => {
          div.remove(); // Remove the div from the DOM
        });
  
        if (divs.length === 0) { console.log(`Unlockable: No divs found with class: ${className}`); }
      });
  
      // Serialize the modified HTML back into a string
      const editedHTML: string = doc.documentElement.outerHTML;
  
      // Open a new tab and render the edited HTML
      const newTab: Window | null = window.open(); // Open a new blank tab
      if (newTab) {
        newTab.document.open(); // Open the document for writing
        newTab.document.write(editedHTML); // Write the edited HTML into the new tab
        newTab.document.close(); // Close the document
      } else {
        console.error("Unlockable: Failed to open a new tab!");
      }
    } catch (error) {
      console.error( "Unlockable: Error fetching or editing page source:", error );
    }
  }