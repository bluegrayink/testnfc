// Daftar UID valid untuk setiap halaman
const uidToPageMap = {
    "miyuki.html": ["64019CB0", "175647BF", "F22F47BF", "996947BF", "97C447BF", "04DE5AA0672681"],
    "rune.html": ["B405A0B0", "CB9B4ABF", "1D044BBF"],
    "gita.html": ["B4C3A1B0", "C37947BF", "0BA547BF"]
};

// Logika untuk tombol scan (untuk perangkat dengan NFC)
document.getElementById("scanButton").addEventListener("click", async () => {
    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        document.getElementById("status").textContent = "Scan started. Please scan your NFC card.";

        ndef.addEventListener("readingerror", () => {
            document.getElementById("status").textContent = "Error reading NFC tag. Try again.";
        });

        ndef.addEventListener("reading", ({ serialNumber }) => {
            const scannedUID = Array.from(new Uint8Array(serialNumber.split(':').map(val => parseInt(val, 16))))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('').toUpperCase();
            validateUID(scannedUID);
        });
    } catch (error) {
        document.getElementById("status").textContent = "Error: NFC scan failed. " + error.message;
    }
});

// Logika untuk tombol iPhone
document.getElementById("iphoneButton").addEventListener("click", () => {
    document.getElementById("iphoneSection").style.display = "block";
});

// Logika untuk tombol Submit
document.getElementById("submitUidButton").addEventListener("click", () => {
    const inputUID = document.getElementById("uidInput").value.trim().toUpperCase();
    if (inputUID) {
        validateUID(inputUID);
    } else {
        document.getElementById("status").textContent = "Please enter a valid UID.";
    }
});

// Fungsi untuk memvalidasi UID
function validateUID(uid) {
    let redirectTo = null;

    for (const [page, uids] of Object.entries(uidToPageMap)) {
        if (uids.includes(uid)) {
            redirectTo = page;
            break;
        }
    }

    if (redirectTo) {
        document.getElementById("status").textContent = "Access granted. Redirecting...";
        setTimeout(() => {
            window.location.href = redirectTo;
        }, 1000); // Delay untuk memberikan feedback
    } else {
        document.getElementById("status").textContent = "Access denied: Invalid UID.";
    }
}
