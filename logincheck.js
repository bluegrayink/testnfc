// Function to check if the device is mobile by user agent or viewport width
function isMobileDevice() {
    // Checking for common mobile devices in the user agent and viewport width
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 800;
}

// Function to check if NFC is supported in the device (Web NFC)
function isNfcSupported() {
    // Checking if NDEFReader (NFC) is available in the browser
    return 'NDEFReader' in window;
}

// Function to handle redirection based on device and NFC support
function checkLoginAndDevice() {
    // Log user agent and window size for debugging
    console.log("User Agent: ", navigator.userAgent);
    console.log("Window Width: ", window.innerWidth);
    
    // Check if the device is mobile
    const isMobile = isMobileDevice();
    
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    // Case 1: If on desktop (PC or laptop), redirect to 404 page
    if (!isMobile) {
        alert("This page is not accessible from a PC or desktop browser.");
        window.location.href = "404.html";  // Redirect to 404 for desktop users
        return;
    }

    // Case 2: If on mobile but NFC is not supported, redirect to login
    if (isMobile && !isNfcSupported()) {
        alert("NFC not supported, redirecting to login page.");
        window.location.href = "index.html";  // Redirect to login for non-NFC mobile browsers
        return;
    }

    // Case 3: If on mobile and NFC is supported, check login status
    if (isMobile && isNfcSupported() && !isLoggedIn) {
        alert("Please log in to continue.");
        window.location.href = "index.html";  // Redirect to login if not logged in
        return;
    }

    // If all checks pass (mobile, NFC, and logged in), allow access
    console.log("Access granted: Logged in, using a mobile device with NFC support.");
}

// Run the check when the page is fully loaded
document.addEventListener('DOMContentLoaded', checkLoginAndDevice);
