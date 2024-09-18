// Function to log messages and update status
var ChromeSamples = {
    log: function(...args) {
        const line = args.map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ');
        document.querySelector('#log').innerHTML += line + '<br>';
    },
    setStatus: function(status) {
        document.querySelector('#status').textContent = status;
    }
};

// Alias for logging
log = ChromeSamples.log;

// Function to check if the device is mobile (by user agent or viewport width)
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 800;
}

// Function to check if NFC is supported on the device (Web NFC)
function isNfcSupported() {
    return 'NDEFReader' in window;
}

// Main function to handle login and device checking
function checkLoginAndDevice() {
    log("User Agent:", navigator.userAgent);  // Log user agent
    log("Window Width:", window.innerWidth);  // Log window width

    // Check if the device is mobile
    const isMobile = isMobileDevice();
    
    // Case 1: Redirect desktop users to 404 page
    if (!isMobile) {
        alert("This page is not accessible from a PC or desktop browser.");
        window.location.href = "404.html";
        return;
    }

    // Case 2: If on mobile but NFC is not supported, redirect to login
    if (!isNfcSupported()) {
        alert("NFC not supported, redirecting to login page.");
        window.location.href = "index.html";
        return;
    }

    // Case 3: If on mobile with NFC but not logged in, redirect to login
    if (!localStorage.getItem("isLoggedIn")) {
        alert("Please log in to continue.");
        window.location.href = "index.html";
        return;
    }

    // If all checks pass (mobile, NFC, logged in), allow access
    log("Access granted: Logged in, using a mobile device with NFC support.");
}

// Execute the login and device check when the page is loaded
document.addEventListener('DOMContentLoaded', checkLoginAndDevice);
