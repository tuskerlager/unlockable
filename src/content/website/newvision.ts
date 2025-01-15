/** New Vision (UG) */
export const hostname: string = "www.newvision.co.ug";
export const title: string = "New Vision";

// --- Remove the classes from elements
// NOT-EQUAL-TO Removing elements based on classes they have (which is the previous function)
// i.e., <div class="paragraph-wrapper nmgp"> to <div class="paragraph-wrapper">
function removeClassFromElements(className: string): void {
    document.querySelectorAll(`.${className}`).forEach((element: Element): void => {
        element.classList.remove(className);
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
  
      // Find all divs with classes "truncated-content"; ideally should be just 1
      const articleDiv: Element | null = doc.querySelector("div.text-subtitle-1.truncated-content.pl-2.pr-2");
      if (!articleDiv) { console.error("Unlockable: No article div found."); return; }
      const classesToRemove: readonly string[] = ["truncated-content"] as const;
      classesToRemove.forEach(className => removeClassFromElements(className));
  
      // Remove any images and their captions using the <img> tag
      const images: NodeListOf<HTMLImageElement> = doc.querySelectorAll("img");
      images.forEach((image: HTMLImageElement): void => { image.remove(); }); 
      // TODO: some captions have <small>, no classes; see how to solve but list in issues
  
  
      // Heading, Subtitle and Author
      const main_heading: Element | null  = doc.querySelector("h1.main_heading");
      const sub_title: Element | null  = doc.querySelector("h3.sub_title");
      const author: Element | null = doc.querySelector("h5.avatar-heading");
      // const image: Element | null = doc.querySelector("img.image_card");
      // const image_caption: Element | null = doc.querySelector("h6.image_caption");
  
      let combinedContent: string = "";
      if (main_heading) combinedContent += main_heading.outerHTML;
      if (author) combinedContent += author.outerHTML;
      if (sub_title) combinedContent += sub_title.outerHTML;
      combinedContent += articleDiv.outerHTML;
  
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