// Function to log messages
var ChromeSamples = {
    log: function() {
        var line = Array.prototype.slice.call(arguments).map(function(argument) {
            return typeof argument === 'string' ? argument : JSON.stringify(argument);
        }).join(' ');
        document.querySelector('#log').innerHTML += line + '<br>'; // Use innerHTML to support HTML formatting
    },
    setStatus: function(status) {
        document.querySelector('#status').textContent = status;
    }
};

// Alias for logging
log = ChromeSamples.log;

        // Function to check if the device is mobile by viewport width or user agent
        function isMobileDevice() {
            return /Mobi|Android|iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;
        }

        window.addEventListener('DOMContentLoaded', () => {
            // Check if user is logged in and device is mobile
            if (!localStorage.getItem("isLoggedIn") || !isMobileDevice()) {
                // Redirect to login page if not logged in or not on a mobile device
                window.location.href = "index.html";
            }
        });

// Lists of valid NFC UIDs for each page
const uidToPageMap = {
    "miyuki.html": ["64019CB0", "175647BF", "F22F47BF", "996947BF", "97C447BF", "04DE5AA0672681"],
    "rune.html": ["B405A0B0", "CB9B4ABF", "1D044BBF"],
    "gita.html": ["B4C3A1B0", "C37947BF", "0BA547BF"]
};

// Event listener for scan button
document.getElementById("scanButton").addEventListener("click", async () => {
    log("Silahkan Scan kartu anda");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        log("<i>&gt; Scan started &lt;</i>"); // Use <i> tags for italic text

        ndef.addEventListener("readingerror", () => {
            log("Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            
            const scannedUID = Array.from(new Uint8Array(serialNumber.split(':').map(val => parseInt(val, 16))))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('').toUpperCase();

            // Find the corresponding page based on the scanned UID
            let redirectTo = null;
            for (const [page, uids] of Object.entries(uidToPageMap)) {
                if (uids.includes(scannedUID)) {
                    redirectTo = page;
                    break;
                }
            }

            if (redirectTo) {
                localStorage.setItem("isLoggedIn", "true"); // Set login status
                window.location.href = redirectTo; // Redirect to the respective page
            } else {
                document.getElementById('status').textContent = "Access Denied: Invalid NFC card.";
            }
        });
    } catch (error) {
        log("Error: " + error);
    }
});
