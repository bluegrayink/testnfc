// Simulasi database hash UID
const uidDatabase = {
    'yourgeneratedhash1': '04DE5AA0672681',
    'yourgeneratedhash2': 'B4E5AA0672692'
};

// Ambil parameter 'code' dari URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    // Validasi apakah hash ada di database
    const uid = uidDatabase[code];

    // Tampilkan UID jika ditemukan
    if (uid) {
        document.getElementById('result').innerHTML = `<p>UID yang valid: ${uid}</p>`;
    } else {
        document.getElementById('result').innerHTML = `<p>Hash tidak ditemukan atau tidak valid.</p>`;
    }
} else {
    document.getElementById('result').innerHTML = `<p>Code tidak ditemukan dalam URL.</p>`;
}