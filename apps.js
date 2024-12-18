// UID map
const uidToPageMap = {
    "jetsukii-klee.html": ["044527A0672681"], // UID untuk halaman Klee
    "jetsukii-zeta.html": ["044527A0672681"]  // UID untuk halaman Zeta
};

// Elements
const kleeButton = document.getElementById("kleeButton");
const zetaButton = document.getElementById("zetaButton");
const statusDiv = document.getElementById("status");
const scanButton = document.getElementById("scanButton");
let targetPage = null; // Halaman yang dituju berdasarkan tombol

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
            window.location.href = targetPage; // Redirect ke halaman target
        }, 1000);
    } else {
        setStatus("Access denied: Invalid UID.");
    }
};

// Tombol untuk membuka halaman Klee
kleeButton.addEventListener("click", () => {
    targetPage = "jetsukii-klee.html"; // Set halaman target ke Klee
    startNFCScan(); // Mulai scan NFC
});

// Tombol untuk membuka halaman Zeta
zetaButton.addEventListener("click", () => {
    targetPage = "jetsukii-zeta.html"; // Set halaman target ke Zeta
    startNFCScan(); // Mulai scan NFC
});

// NFC scanning logic
const startNFCScan = async () => {

    setStatus("Please scan your NFC card...");

    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.addEventListener("readingerror", () => {
            setStatus("Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            const scannedUID = sanitizeUID(serialNumber);
            validateAndRedirect(scannedUID);
        });
    } catch (error) {
        setStatus("Error: " + error.message);
    }
};
