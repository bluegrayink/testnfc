// UID map
const uidToPageMap = {
    "miyukitest.html": ["432F47BF", "704248BF", "476F47BF"],
};

const uidToImageMap = {
    "476F47BF": "miyuki-nicole01.jpg",
    "704248BF": "miyuki-zeta01.jpg",
    "432F47BF": "miyuki-raora01.jpg",
};

// Elements
const iphoneButton = document.getElementById("iphoneButton");
const iphoneSection = document.getElementById("iphoneSection");
const submitUidButton = document.getElementById("submitUidButton");
const uidInput = document.getElementById("uidInput");
const statusDiv = document.getElementById("status");
const scanButton = document.getElementById("scanButton");
const logDiv = document.getElementById("log");
const dynamicImage = document.getElementById("dynamicImage");


// Helper functions for logging and status
const ChromeSamples = {
    log: function () {
        const line = Array.from(arguments)
            .map(arg => (typeof arg === "string" ? arg : JSON.stringify(arg)))
            .join(" ");
        logDiv.innerHTML += line + "<br>";
    },
    setStatus: function (status) {
        statusDiv.textContent = status;
    }
};

// Alias for logging
const log = ChromeSamples.log;

// Function to sanitize UID (remove colons if present)
const sanitizeUID = (uid) => {
    return uid.replace(/:/g, "").toUpperCase(); // Remove ":" and convert to uppercase
};

// Function to validate UID and redirect
const validateAndRedirect = (rawUid) => {
    const uid = sanitizeUID(rawUid); // Sanitize UID
    let redirectTo = null;

    for (const [page, uids] of Object.entries(uidToPageMap)) {
        if (uids.includes(uid)) {
            redirectTo = page;
            break;
        }
    }

    if (redirectTo) {
        ChromeSamples.setStatus("Access granted. Redirecting...");
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true"); // Set login status
            window.location.href = redirectTo; // Redirect to respective page
        }, 1000);
    } else {
        ChromeSamples.setStatus("Access denied: Invalid UID.");
    }
};

// Show input section for iPhone
iphoneButton.addEventListener("click", () => {
    iphoneSection.style.display = "block";
});

// Handle UID submission
submitUidButton.addEventListener("click", () => {
    const rawUid = uidInput.value.trim();
    if (rawUid) {
        validateAndRedirect(rawUid);
    } else {
        ChromeSamples.setStatus("Please enter a valid UID.");
    }
});

const updateImage = (rawUid) => {
    const uid = sanitizeUID(rawUid);
    const imagePath = uidToImageMap[uid];

    if (imagePath) {
        dynamicImage.src = imagePath;
        dynamicImage.alt = `Image for UID ${uid}`;
        log(`Image updated for UID: ${uid}`);
    } else {
        dynamicImage.src = "";
        dynamicImage.alt = "No image available";
        log("Invalid UID. No image available.");
    }
};

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
            const scannedUID = Array.from(new Uint8Array(serialNumber.split(':').map(val => parseInt(val, 16))))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase();

            log(`Scanned UID: ${scannedUID}`);
            validateAndRedirect(scannedUID);
        });
    } catch (error) {
        log("Error: " + error.message);
    }
});
