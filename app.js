// Function to log messages
var ChromeSamples = {
    log: function() {
        var line = Array.prototype.slice.call(arguments).map(function(argument) {
            return typeof argument === 'string' ? argument : JSON.stringify(argument);
        }).join(' ');
        document.querySelector('#log').textContent += line + '\n';
    },
    setStatus: function(status) {
        document.querySelector('#status').textContent = status;
    }
};

// Alias for logging
log = ChromeSamples.log;

// Check if NDEFReader is available
if (!("NDEFReader" in window)) {
    ChromeSamples.setStatus("Web NFC is not available. Use Chrome on Android.");
}

// Valid NFC UIDs and their corresponding redirect pages
const uidToPageMap = {
    "64019CB0": "miyuki.html",
    "64019CB1": "rune.html",
    "64019CB2": "gita.html"
};

// Event listener for scan button
document.getElementById("scanButton").addEventListener("click", async () => {
    log("User clicked scan button");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        log("> Scan started");

        ndef.addEventListener("readingerror", () => {
            log("Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            log(`> Serial Number: ${serialNumber}`);
            const scannedUID = Array.from(new Uint8Array(serialNumber.split(':').map(val => parseInt(val, 16))))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('').toUpperCase();

            // Check if the scanned UID matches any in the map and redirect accordingly
            if (uidToPageMap[scannedUID]) {
                localStorage.setItem("isLoggedIn", "true"); // Set login status
                window.location.href = uidToPageMap[scannedUID]; // Redirect to the respective page
            } else {
                document.getElementById('status').textContent = "Access Denied: Invalid NFC card.";
            }
        });
    } catch (error) {
        log("Error: " + error);
    }
});
