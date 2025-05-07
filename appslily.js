// Elements
const buttonContainer = document.getElementById("buttonContainer");
const kontenButton = document.getElementById("kontenButton");
const calendarButton = document.getElementById("calendarButton");
const statusDiv = document.getElementById("status");

// Langsung tampilkan tombol saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
    buttonContainer.style.display = "block";
    statusDiv.textContent = "Welcome! Choose an option below.";
});

// Event listeners untuk navigasi
kontenButton.addEventListener("click", () => window.location.href = "lily.html");
calendarButton.addEventListener("click", () => window.location.href = "eventlily.html");
