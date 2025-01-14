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