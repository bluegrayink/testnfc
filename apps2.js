// Daftar UID valid untuk setiap halaman
const uidToPageMap = {
    "miyuki.html": ["64019CB0", "175647BF", "F22F47BF", "996947BF", "97C447BF", "04DE5AA0672681"],
    "rune.html": ["B405A0B0", "CB9B4ABF", "1D044BBF"],
    "gita.html": ["B4C3A1B0", "C37947BF", "0BA547BF"]
};

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
        }, 1000); // Tunggu 1 detik sebelum pengalihan untuk memberikan umpan balik ke pengguna
    } else {
        document.getElementById("status").textContent = "Access denied: Invalid UID.";
    }
}

// Event listener untuk tombol submit
document.getElementById("submitUidButton").addEventListener("click", () => {
    const inputUID = document.getElementById("uidInput").value.trim().toUpperCase();
    if (inputUID) {
        validateUID(inputUID); // Validasi UID
    } else {
        document.getElementById("status").textContent = "Please enter a valid UID.";
    }
});
