// -------------- LOADING BANNER ---------------
// Function to display the loading bar at the top of the page, above the blur effect
function showLoadingBar(): void {
  // Create a loading container and style it
  const loadingContainer: HTMLDivElement = document.createElement("div");
  loadingContainer.id = "loading-container";
  const containerStyles: Partial<CSSStyleDeclaration> = {
    position: "fixed", // Use fixed positioning to place it at the top
    top: "0", // Place it at the top of the viewport
    left: "0", // Align it to the left
    width: "100%", // Full width
    height: "40px", // Height of the loading bar
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999", // Ensure it's above everything else
  };

  Object.assign(loadingContainer.style, containerStyles);

  // Create the loading bar
  const loadingBar: HTMLDivElement = document.createElement("div");
  const loadingBarStyles: Partial<CSSStyleDeclaration> = {
    width: "80%", // Width of the loading bar inside the container
    height: "100%", // Fill the entire height
    backgroundColor: "#ccc",
    borderRadius: "5px",
    overflow: "hidden",
  };

  Object.assign(loadingBar.style, loadingBarStyles);

  // Create the progress indicator inside the loading bar
  const progress: HTMLDivElement = document.createElement("div");
  const progressStyles: Partial<CSSStyleDeclaration> = {
    width: "0%", // Initial width of the progress bar
    height: "100%",
    backgroundColor: "rgba(234,113,46,1)",
    transition: "width 1s ease-in-out",
  };

  Object.assign(progress.style, progressStyles);

  loadingBar.appendChild(progress); // Add the progress to the loading bar

  // Add a message in the center of the container
  const message = document.createElement("div");
  message.innerText = "Unlocking premium article";

  const messageStyles: Partial<CSSStyleDeclaration> = {
    position: "absolute",
    fontSize: "20px",
    color: "white",
    fontWeight: "bold",
    zIndex: "100", // Ensure the message appears on top of the loading bar
  };

  Object.assign(message.style, messageStyles);

  // Add the loading bar and message to the loading container
  loadingContainer.appendChild(loadingBar);
  loadingContainer.appendChild(message);

  // Add the loading container to the body
  document.body.appendChild(loadingContainer);

  // Apply blur to the entire page
  const bodyStyles: Partial<CSSStyleDeclaration> = {
    filter: "blur(5px)",
    transition: "filter 1s ease-in-out",
  };

  Object.assign(document.body.style, bodyStyles);

  // Simulate the progress bar fill over 1 seconds
  setTimeout((): void => {
    progress.style.width = "100%"; // Fill the progress bar
  }, 100); // Delay to trigger transition

  // After 2 seconds, remove the loading bar and unblur the page
  setTimeout((): void => {
    document.body.removeChild(loadingContainer); // Remove the loading container
    document.body.style.filter = "none"; // Unblur the page
  }, 500); // Remove after 1 seconds
}
