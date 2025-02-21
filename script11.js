document.addEventListener("DOMContentLoaded", () => {
    const images = [
        { id: "432F47BF", img_src: "raora.jpg" },
        { id: "704248BF", img_src: "zeta.jpg" },
        { id: "476F47BF", img_src: "nicole.jpg" }
    ];

    const nfcData = localStorage.getItem("nfcData");
    const coverImage = document.querySelector(".cover-image");

    if (nfcData) {
        const image = images.find(img => img.id === nfcData);
        if (image) {
            coverImage.style.backgroundImage = `url(Photo/${image.img_src})`;
        } else {
            coverImage.innerHTML = "<p>Gambar tidak ditemukan</p>";
        }
    }
});
