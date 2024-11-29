// Mendapatkan parameter 'code' dari URL
const urlParams = new URLSearchParams(window.location.search);
const hashFromUrl = urlParams.get('code');

// Database simulasi hash UID
const uidDatabase = {
    '04DE5AA0672681': 'yourgeneratedhash1',
    'B4E5AA0672692': 'yourgeneratedhash2'
};

// Fungsi untuk memverifikasi hash
function verifyHash(hash) {
    for (let uid in uidDatabase) {
        const validHash = uidDatabase[uid];
        if (validHash === hash) {
            return `UID untuk hash ini adalah ${uid}. Validasi berhasil!`;
        }
    }
    return 'Hash tidak valid! Akses ditolak.';
}

// Tampilkan hasil validasi
const statusMessage = verifyHash(hashFromUrl);
document.getElementById('status').innerHTML = statusMessage;