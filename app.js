// Update with the user's NFC UID
const validNFCID = "64:01:9C:B0";

// Function to detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Redirect if not on a mobile device
if (!isMobileDevice()) {
    document.body.innerHTML = "<h2>Login only accessible via mobile device</h2>";
} else {
    // NFC login handling
    document.getElementById("nfcLoginButton")?.addEventListener("click", function() {
        if ('NDEFReader' in window) {
            const ndef = new NDEFReader();
            ndef.scan().then(() => {
                console.log("NFC Scan started successfully.");
                ndef.onreading = event => {
                    const nfcId = event.serialNumber;
                    if (nfcId === validNFCID) {
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("nfcId", nfcId);
                        window.location.href = "testnfc/profile.html";
                    } else {
                        document.getElementById("errorMessage").textContent = "NFC card not recognized.";
                    }
                };
            }).catch(error => {
                console.log(`Error: ${error}`);
                document.getElementById("errorMessage").textContent = "NFC scanning failed.";
            });
        } else {
            document.getElementById("errorMessage").textContent = "NFC not supported by this device.";
        }
    });
}

// Profile page handling
window.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        window.location.href = "index.html";
    } else {
        const nfcId = localStorage.getItem("nfcId");
        document.getElementById("usernameDisplay").textContent = `User with NFC ID: ${nfcId}`;
    }

    document.getElementById("logoutButton")?.addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("nfcId");
        window.location.href = "index.html";
    });
});
