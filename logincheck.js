// Function to check if the device is mobile by viewport width or user agent
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;
}

// Alias for logging
log = ChromeSamples.log;

// Check if NDEFReader is available
if (!("NDEFReader" in window)) {
    alert("Not Available on PC or Desktop browser");
    window.location.href = "404.html";
}

window.addEventListener('DOMContentLoaded', () => {
    // Log user agent and window size for testing purposes
    console.log("User Agent: ", navigator.userAgent);
    console.log("Window Width: ", window.innerWidth);

    // Check if user is logged in and device is mobile
    if (!localStorage.getItem("isLoggedIn") || !isMobileDevice()) {
        alert("Redirecting to login page or desktop device detected.");
        window.location.href = "index.html"; // Redirect if not logged in or on desktop
    }
});
