document.addEventListener('DOMContentLoaded', function () {
    const eventButton = document.getElementById("eventButton");

    eventButton.addEventListener("click", () => {
        // Arahkan ke halaman event
        window.location.href = "event.html"; // Ganti dengan URL halaman event Anda

        // Nonaktifkan tombol setelah diklik
        eventButton.disabled = true;
    });
});
