/** The Standard (KE) */
export const hostname = "www.standardmedia.co.ke";

// --- Remove elements based on classes they have from a parent element
// NOT-EQUAL-TO Removing classes from an element (as defined elsewhere)
function removeElementsByClass(parentElement, classArray) {
    classArray.forEach((className) => {
        const elementsToRemove = parentElement.querySelectorAll(`.${className}`);
        elementsToRemove.forEach((element) => {
            element.remove();
        });
    });
}

export async function handle() {
    const url = window.location.href; // Get the current page URL
  
    try {
      // Fetch the raw HTML source of the page
      const response = await fetch(url, { method: "GET", headers: { "Content-Type": "text/html" }, } );
      if (!response.ok) { console.error( "Unlockable: Failed to fetch page source:", response.statusText); return; }
  
      const rawHTML = await response.text(); // Get the HTML as plain text
      if (!rawHTML) { console.error("Unlockable: No HTML content returned."); return; }
  
      // Parse the raw HTML into a DOM structure to manipulate it
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, "text/html");
  
      // Find the div with the ID "js-enabled"
      const jsEnabledDiv = doc.getElementById("js-enabled");
      if (!jsEnabledDiv) { console.error("Unlockable: 'js-enabled' div not found."); return; }
      const classesToRemove = ["subscribe-mid-art"];
      removeElementsByClass(jsEnabledDiv, classesToRemove);
  
      // h1, and the first <small> with class text-muted i.e author tag
      // FIXME: this logic doesn't guarantee first or just one; rework
      const heading1 = doc.querySelector("h1");
      const authorTag = doc.querySelector("small.text-muted");
  
      // Combine the found elements and the article content
      let combinedContent = "";
      if (heading1) combinedContent += heading1.outerHTML;
      if (authorTag) combinedContent += authorTag.outerHTML;
      combinedContent += jsEnabledDiv.outerHTML;
  
      // Open a new tab and render the edited HTML
      const newTab = window.open(); // Open a new blank tab
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
  