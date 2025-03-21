// UID map
const validUIDs = ["044527A0672681"];

// Elements
const androidButton = document.getElementById("androidButton");
const iosButton = document.getElementById("iosButton");
const buttonContainer = document.getElementById("buttonContainer");
const kleeButton = document.getElementById("kleeButton");
const zetaButton = document.getElementById("zetaButton");
const calendarButton = document.getElementById("calendarButton");
const statusDiv = document.getElementById("status");

// Helper function to set status
const setStatus = (status) => {
    statusDiv.textContent = status;
};

// Function to sanitize UID
const sanitizeUID = (uid) => {
    return uid.replace(/:/g, "").toUpperCase();
};

// Function to validate UID and show platform buttons
const validateUID = (rawUid) => {
    const uid = sanitizeUID(rawUid);
    if (validUIDs.includes(uid)) {
        setStatus("Access granted. Please select your platform.");
        androidButton.style.display = "block";
        iosButton.style.display = "block";
    } else {
        setStatus("Access denied: Invalid NFC.");
    }
};

// Function to show navigation buttons after platform selection
const showNavigationButtons = () => {
    buttonContainer.style.display = "block";
    androidButton.style.display = "none";
    iosButton.style.display = "none";
};

// Event listeners for platform selection
androidButton.addEventListener("click", showNavigationButtons);
iosButton.addEventListener("click", showNavigationButtons);

// Event listeners for direct page navigation
kleeButton.addEventListener("click", () => window.location.href = "jetsukii-klee.html");
zetaButton.addEventListener("click", () => window.location.href = "jetsukii-zeta.html");
calendarButton.addEventListener("click", () => window.location.href = "eventjetsukii.html");

// NFC scanning logic
const startNFCScan = async () => {
    if (!("NDEFReader" in window)) {
        setStatus("Your device or browser does not support NFC scanning.");
        return;
    }

    setStatus("Please scan your NFC card...");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.addEventListener("readingerror", () => {
            setStatus("Cannot read data from the NFC tag. Try holding your card closer.");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            validateUID(serialNumber);
        });
    } catch (error) {
        setStatus("Error: " + error.message);
    }
};

// Start NFC scan automatically on load
startNFCScan();
