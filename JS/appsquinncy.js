// UID map
const uidToPageMap = {
    "quinncy-boa.html": ["81F847BF","044527A0672681"], 
    "eventquinncy.html": ["81F847BF","044527A0672681"], 
};

// Elements
const boaButton = document.getElementById("boaButton");
const calendarButton = document.getElementById("calendarButton");
const statusDiv = document.getElementById("status");
let targetPage = null; 

// Helper functions for logging and status
const setStatus = (status) => {
    statusDiv.textContent = status;
};

// Function to sanitize UID (remove colons if present)
const sanitizeUID = (uid) => {
    return uid.replace(/:/g, "").toUpperCase(); // Remove ":" and convert to uppercase
};

// Function to validate UID and redirect
const validateAndRedirect = (rawUid) => {
    const uid = sanitizeUID(rawUid); // Sanitize UID
    const validUids = uidToPageMap[targetPage] || []; // UID valid untuk halaman target

    if (validUids.includes(uid)) {
        setStatus("Access granted. Redirecting...");
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true"); // Set login status
            localStorage.setItem("targetPage", targetPage); // Simpan halaman tujuan
            window.location.href = targetPage; // Redirect ke halaman target
        }, 1000);
    } else {
        setStatus("Access denied: Invalid UID.");
    }
};

// Tombol untuk membuka halaman Klee
boaButton.addEventListener("click", () => {
    targetPage = "quinncy-boa.html"; // Set halaman target ke Klee
    startNFCScan(); // Mulai scan NFC
});

// Tombol untuk membuka halaman Kalender
calendarButton.addEventListener("click", () => {
    targetPage = "eventquinncy.html"; // Set halaman target ke Kalender
    startNFCScan(); // Mulai scan NFC
});

// NFC scanning logic
const startNFCScan = async () => {
    // Periksa dukungan NFC sebelum melanjutkan
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
            validateAndRedirect(serialNumber);
        });
    } catch (error) {
        setStatus("Error: " + error.message);
    }
};
