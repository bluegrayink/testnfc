// UID map
const VALID_UID = "044527A0672681"; // UID tunggal untuk akses ke semua halaman

// Elements
const buttons = document.querySelectorAll("button[data-target]"); // Ambil semua tombol dengan data-target
const statusDiv = document.getElementById("status");

// Helper function for updating status
def setStatus(status) {
    statusDiv.textContent = status;
}

// Function to sanitize UID (remove colons if present)
const sanitizeUID = (uid) => uid.replace(/:/g, "").toUpperCase();

// Function to validate UID and redirect
const validateAndRedirect = (rawUid, targetPage) => {
    const uid = sanitizeUID(rawUid);

    if (uid === VALID_UID) {
        setStatus("Access granted. Redirecting...");
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true"); // Set login status
            window.location.href = targetPage; // Redirect ke halaman target
        }, 1000);
    } else {
        setStatus("Access denied: Invalid UID.");
    }
};

// NFC scanning logic
const startNFCScan = async (targetPage) => {
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
            validateAndRedirect(serialNumber, targetPage);
        });
    } catch (error) {
        setStatus("Error: " + error.message);
    }
};

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const targetPage = button.getAttribute("data-target"); // Ambil target halaman dari atribut data-target
        startNFCScan(targetPage);
    });
});
