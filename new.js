const uidToPageMap = {
    "miyuki.html": ["175647BF", "F22F47BF", "996947BF", "97C447BF"],
    "eventmiyuki.html": ["749D47BF"],
    "jetsukii-klee.html": ["04CC4CA0672681"],
    "jetsukii-zeta.html": ["04E63CA1672681"],
    "eventjetsukii.html": ["04AF4FA0672681"],
    "lily.html": ["FEEA47BF"],
    "eventlily.html": ["7ED347BF"],
    "rune.html": ["CB9B4ABF", "1D044BBF"],
    "gita.html": ["C37947BF"],
    "aika.html": ["0460A2B0", "AIKA123"],
    "eventaika.html": ["54B0A4B0", "AIKA123CAL"],
    "kailiaa-viper.html": ["F481A3B0"],
    "kailiaa-mikasa.html": ["B4C3A1B0"],
    "eventkailiaa.html": ["B405A0B0"],
    "mei-christmas.html": ["MEI123"],
    "eventmei.html": ["MEI123CAL"],
    "vii-photobook.html": ["447B47BF"],
    "faacrista-ellenjoe.html": ["FAA123"],
    "eventfaacrista.html": ["FAA123CAL"],
    "akaei-ruanmei.html": ["AKAEI123R"],
    "akaei-nikke.html": ["AKAEI123N"],
    "eventakaei.html": ["AKAEI123C"],
    "quinncy-boa.html": ["264F47BF"],
    "eventquinncy.html":["9D0947BF"],
    "ayudesu-sparkle.html": ["C4A7FA92", "04870593", "341E0C93", "34D90393"],
    "eventayudesu.html":["C4F00B93", "84F0F892", "04A80593", "B4F3F892"]
};

// Elements
const iphoneButton = document.getElementById("iphoneButton");
const iphoneSection = document.getElementById("iphoneSection");
const submitUidButton = document.getElementById("submitUidButton");
const uidInput = document.getElementById("uidInput");
const statusDiv = document.getElementById("status");
const scanButton = document.getElementById("scanButton");
const logDiv = document.getElementById("log");

// Helper functions for logging and status
const ChromeSamples = {
    log: function (message) {
        logDiv.innerHTML += message + "<br>";
    },
    setStatus: function (status) {
        statusDiv.textContent = status;
    }
};

const log = ChromeSamples.log;

// Function to sanitize UID (remove colons if present)
const sanitizeUID = (uid) => uid.replace(/:/g, "").toUpperCase();

// Function to validate UID and redirect
const validateAndRedirect = (rawUid) => {
    const uid = sanitizeUID(rawUid);
    let redirectTo = Object.keys(uidToPageMap).find(page => uidToPageMap[page].includes(uid));

    if (redirectTo) {
        ChromeSamples.setStatus("Access granted. Redirecting...");
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = redirectTo;
        }, 1000);
    } else {
        ChromeSamples.setStatus("Access denied: Invalid UID.");
    }
};

// NFC scanning logic
scanButton.addEventListener("click", async () => {
    log("Please scan your NFC card...");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        log("<i>&gt; Scan started &lt;</i>");

        ndef.addEventListener("readingerror", () => {
            log("Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            if (!serialNumber) {
                log("No serial number detected!");
                return;
            }
            const scannedUID = sanitizeUID(serialNumber);
            log(`Scanned UID: ${scannedUID}`);
            validateAndRedirect(scannedUID);
        });
    } catch (error) {
        log("Error: " + error.message);
    }
});

// Show input section for iPhone
if (iphoneButton) {
    iphoneButton.addEventListener("click", () => {
        iphoneSection.style.display = "block";
    });
}

// Handle UID submission
if (submitUidButton) {
    submitUidButton.addEventListener("click", () => {
        const rawUid = uidInput.value.trim();
        if (rawUid) {
            validateAndRedirect(rawUid);
        } else {
            ChromeSamples.setStatus("Please enter a valid UID.");
        }
    });
}
