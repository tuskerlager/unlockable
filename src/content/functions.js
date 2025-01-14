/** */

// -------------- 📰 NATION.AFRICA 📰 ---------------
/** Re-work the Nation Media Group sites */
async function reworkNMGroup() {
  const url = window.location.href; // Get the current page URL

  try {
    // Fetch the raw HTML source of the page
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "text/html" },
    });
    if (!response.ok) {
      console.error(
        "📰 Paywaller: Failed to fetch page source:",
        response.statusText
      );
      return;
    }
    const rawHTML = await response.text(); // Get the HTML as plain text

    // Parse the HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, "text/html"); // Parse the raw HTML into a DOM Document

    // Check if the page contains the <aside> with id "paywall"
    const paywallAside = doc.querySelector("aside#paywall");
    if (!paywallAside) {
      return;
    } // If no paywall aside, exit without making changes}

    // Find and handle the <header> and <nav> elements; removes annoying whitespace before body; nav left in place
    const header = doc.querySelector("header.page-grid-header");
    if (header) {
      const nav = header.querySelector("nav.main-nav"); // Find the <nav> inside the header
      if (nav) {
        // Remove the header and insert the copied nav in its place
        header.remove(); // Delete the header
        doc.body.insertBefore(nav, doc.body.firstChild); // Insert the nav at the beginning of the body
      } else {
        console.error(
          "📰 Paywaller: No <nav> with class 'main-nav' found inside the header."
        );
      }
    } else {
      console.error(
        "📰 Paywaller: No <header> with class 'page-grid-header' found."
      );
    }

    // Find all divs with classes "text-block blk-txt"; ideally should be just 1
    const textBlockDivs = doc.querySelectorAll("div.text-block.blk-txt");

    // Loop through each div and remove the "nmgp" class if present
    textBlockDivs.forEach((div) => {
      const divsWithClass = div.querySelectorAll("div.paragraph-wrapper.nmgp");

      if (divsWithClass.length > 0) {
        divsWithClass.forEach((innerDiv) => innerDiv.classList.remove("nmgp"));
      }
    });

    // Delete certain divs given the IDs in an array
    const idsToDelete = ["article-general-spinner", "paywall", "datawall"];
    idsToDelete.forEach((id) => {
      const divToDelete = doc.getElementById(id); // Find the div by ID
      if (divToDelete) {
        divToDelete.remove(); // Remove the div from the DOM
      } else {
        console.log(`📰 Paywaller: No div found with id: ${id}`);
      }
    });

    // Delete certain divs by their class names
    const classNamesToDelete = ["subscription-status-recommendation"];
    classNamesToDelete.forEach((className) => {
      const divs = doc.querySelectorAll(`div.${className}`); // Find divs with the class
      divs.forEach((div) => {
        div.remove(); // Remove the div from the DOM
      });

      if (divs.length === 0) {
        console.log(`📰 Paywaller: No divs found with class: ${className}`);
      }
    });

    // Serialize the modified HTML back into a string
    const editedHTML = doc.documentElement.outerHTML;

    // Open a new tab and render the edited HTML
    const newTab = window.open(); // Open a new blank tab
    if (newTab) {
      newTab.document.open(); // Open the document for writing
      newTab.document.write(editedHTML); // Write the edited HTML into the new tab
      newTab.document.close(); // Close the document
    } else {
      console.error("📰 Paywaller: Failed to open a new tab!");
    }
  } catch (error) {
    console.error(
      "📰 Paywaller: Error fetching or editing page source:",
      error
    );
  }
}

// -------------- 📰 STANDARD MEDIA 📰 --------------
async function reworkStandardMedia() {
  const url = window.location.href; // Get the current page URL

  try {
    // Fetch the raw HTML source of the page
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "text/html" },
    });
    if (!response.ok) {
      console.error(
        "📰 Paywaller: Failed to fetch page source:",
        response.statusText
      );
      return;
    }

    const rawHTML = await response.text(); // Get the HTML as plain text
    if (!rawHTML) {
      console.error("📰 Paywaller: No HTML content returned.");
      return;
    }

    // Parse the raw HTML into a DOM structure to manipulate it
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, "text/html");

    // Find the div with the ID "js-enabled"
    const jsEnabledDiv = doc.getElementById("js-enabled");
    if (!jsEnabledDiv) {
      console.error("📰 Paywaller: 'js-enabled' div not found.");
      return;
    }
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
      console.error("📰 Paywaller: Failed to open a new tab!");
    }
  } catch (error) {
    console.error(
      "📰 Paywaller: Error fetching or editing page source:",
      error
    );
  }
}

// --- Remove elements based on classes they have from a parent element
// NOT-EQUAL-TO Removing classes from an element (which is the next function)
function removeElementsByClass(parentElement, classArray) {
  classArray.forEach((className) => {
    const elementsToRemove = parentElement.querySelectorAll(`.${className}`);
    elementsToRemove.forEach((element) => {
      element.remove();
    });
  });
}

// --- Remove the classes from elements
// NOT-EQUAL-TO Removing elements based on classes they have (which is the previous function)
// i.e., <div class="paragraph-wrapper nmgp"> to <div class="paragraph-wrapper">
function removeClassFromElements(className) {
  document.querySelectorAll(`.${className}`).forEach((element) => {
    element.classList.remove(className);
  });
}

// --- Delete divs by their id
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

// -------------- 📰 NEW VISION (UG) 📰 -------------
async function reworkNewVision() {
  const url = window.location.href; // Get the current page URL

  try {
    // Fetch the raw HTML source of the page
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "text/html" },
    });
    if (!response.ok) {
      console.error(
        "📰 Paywaller: Failed to fetch page source:",
        response.statusText
      );
      return;
    }

    const rawHTML = await response.text(); // Get the HTML as plain text
    if (!rawHTML) {
      console.error("📰 Paywaller: No HTML content returned.");
      return;
    }

    // Parse the raw HTML into a DOM structure to manipulate it
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, "text/html");

    // Find all divs with classes "truncated-content"; ideally should be just 1
    const articleDiv = doc.querySelector(
      "div.text-subtitle-1.truncated-content.pl-2.pr-2"
    );
    if (!articleDiv) {
      console.error("📰 Paywaller: No article div found.");
      return;
    }
    const classesToRemove = ["truncated-content"];
    classesToRemove.forEach((className) => removeClassFromElements(className));

    // Remove any images and their captions using the <img> tag
    const images = doc.querySelectorAll("img");
    images.forEach((image) => {
      image.remove();
    }); // TODO: some captions have <small>, no classes; see how to solve but list in issues

    // Heading, Subtitle and Author
    const main_heading = doc.querySelector("h1.main_heading");
    const sub_title = doc.querySelector("h3.sub_title");
    const author = doc.querySelector("h5.avatar-heading");
    // const image = doc.querySelector("img.image_card");
    // const image_caption = doc.querySelector("h6.image_caption");

    let combinedContent = "";
    if (main_heading) combinedContent += main_heading.outerHTML;
    if (author) combinedContent += author.outerHTML;
    if (sub_title) combinedContent += sub_title.outerHTML;
    combinedContent += articleDiv.outerHTML;

    // Open a new tab and render the edited HTML
    const newTab = window.open(); // Open a new blank tab
    if (newTab) {
      newTab.document.open(); // Open the document for writing
      newTab.document.write(combinedContent); // Write the edited HTML into the new tab
      newTab.document.close(); // Close the document
    } else {
      console.error("📰 Paywaller: Failed to open a new tab!");
    }
  } catch (error) {
    console.error(
      "📰 Paywaller: Error fetching or editing page source:",
      error
    );
  }
}
