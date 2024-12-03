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

// Check if NDEFReader is available
if (!("NDEFReader" in window)) {
    alert("Not Available on PC or Desktop browser");
    window.location.href = "404.html";
}

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
            // Convert serialNumber to UID
            const scannedUID = Array.from(new Uint8Array(serialNumber.split(':').map(val => parseInt(val, 16))))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('').toUpperCase();

            validateUID(scannedUID);
        });
    } catch (error) {
        log("Error: " + error);
    }
});

// Event listener for iPhone button
document.getElementById("iphoneButton").addEventListener("click", () => {
    const iphoneSection = document.getElementById("iphoneSection");
    iphoneSection.style.display = "block";
});

// Event listener for manual UID submission
document.getElementById("submitUidButton").addEventListener("click", () => {
    const uidInput = document.getElementById("uidInput").value.trim().toUpperCase();
    if (uidInput) {
        validateUID(uidInput);
    } else {
        ChromeSamples.setStatus("Please enter a valid UID.");
    }
});

// Function to validate UID
function validateUID(uid) {
    let redirectTo = null;

    for (const [page, uids] of Object.entries(uidToPageMap)) {
        if (uids.includes(uid)) {
            redirectTo = page;
            break;
        }
    }

    if (redirectTo) {
        localStorage.setItem("isLoggedIn", "true"); // Set login status
        window.location.href = redirectTo; // Redirect to the respective page
    } else {
        ChromeSamples.setStatus("Access Denied: Invalid NFC card.");
    }
}
