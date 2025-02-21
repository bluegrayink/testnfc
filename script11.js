document.addEventListener("DOMContentLoaded", () => {
    const images = [
        { id: "432F47BF", img_src: "miyuki-raora01.jpg" },
        { id: "704248BF", img_src: "miyuki-zeta01.jpg" },
        { id: "476F47BF", img_src: "miyuki-nicole01.jpg" }
    ];

    const nfcData = localStorage.getItem("nfcData");
    const coverImage = document.querySelector(".cover-image");

    if (nfcData) {
        const image = images.find(img => img.id === nfcData);
        if (image) {
            coverImage.style.backgroundImage = `url(Photo/Miyuki/${image.img_src})`;
        } else {
            coverImage.innerHTML = "<p>Gambar tidak ditemukan</p>";
        }
    }
});
