// -------------- LOADING BANNER ---------------
// Function to display the loading bar at the top of the page, above the blur effect
function showLoadingBar() {
    // Create a loading container and style it
    const loadingContainer = document.createElement("div");
    loadingContainer.id = "loading-container";
    loadingContainer.style.position = "fixed"; // Use fixed positioning to place it at the top
    loadingContainer.style.top = "0"; // Place it at the top of the viewport
    loadingContainer.style.left = "0"; // Align it to the left
    loadingContainer.style.width = "100%"; // Full width
    loadingContainer.style.height = "40px"; // Height of the loading bar
    loadingContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    loadingContainer.style.display = "flex";
    loadingContainer.style.justifyContent = "center";
    loadingContainer.style.alignItems = "center";
    loadingContainer.style.zIndex = "99999"; // Ensure it's above everything else
  
    // Create the loading bar
    const loadingBar = document.createElement("div");
    loadingBar.style.width = "80%"; // Width of the loading bar inside the container
    loadingBar.style.height = "100%"; // Fill the entire height
    loadingBar.style.backgroundColor = "#ccc";
    loadingBar.style.borderRadius = "5px";
    loadingBar.style.overflow = "hidden";
  
    // Create the progress indicator inside the loading bar
    const progress = document.createElement("div");
    progress.style.width = "0%"; // Initial width of the progress bar
    progress.style.height = "100%";
    progress.style.backgroundColor = "rgba(234,113,46,1)";
    progress.style.transition = "width 1s ease-in-out";
  
    loadingBar.appendChild(progress); // Add the progress to the loading bar
  
    // Add a message in the center of the container
    const message = document.createElement("div");
    message.innerText = "Unlocking premium article";
    message.style.position = "absolute";
    message.style.fontSize = "20px";
    message.style.color = "white";
    message.style.fontWeight = "bold";
    message.style.zIndex = "100"; // Ensure the message appears on top of the loading bar
  
    // Add the loading bar and message to the loading container
    loadingContainer.appendChild(loadingBar);
    loadingContainer.appendChild(message);
  
    // Add the loading container to the body
    document.body.appendChild(loadingContainer);
  
    // Apply blur to the entire page
    document.body.style.filter = "blur(5px)";
    document.body.style.transition = "filter 1s ease-in-out";
  
    // Simulate the progress bar fill over 1 seconds
    setTimeout(() => {
      progress.style.width = "100%"; // Fill the progress bar
    }, 100); // Delay to trigger transition
  
    // After 2 seconds, remove the loading bar and unblur the page
    setTimeout(() => {
      document.body.removeChild(loadingContainer); // Remove the loading container
      document.body.style.filter = "none"; // Unblur the page
    }, 500); // Remove after 1 seconds
  }
  