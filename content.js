document.addEventListener('DOMContentLoaded', function() {
    const photoGallery1 = document.querySelector('.photo-gallery1');
    const photoGallery2 = document.querySelector('.photo-gallery2');
    const videoGallery = document.querySelector('.video-gallery');

    // Function to show specific content
    function showContent(contentType) {
        // Hide all galleries
        photoGallery1.classList.add('hidden');
        photoGallery2.classList.add('hidden');
        videoGallery.classList.add('hidden');

        // Show the selected gallery
        document.querySelector(`.${contentType}`).classList.remove('hidden');
    }

    document.getElementById("photoButton1").addEventListener("click", () => {
        showContent('photo-gallery1');
    });

    document.getElementById("photoButton2").addEventListener("click", () => {
        showContent('photo-gallery2');
    });

    document.getElementById("videoButton").addEventListener("click", () => {
        showContent('video-gallery');
    });

    document.getElementById("logoutButton").addEventListener("click", () => {
        // Clear login status
        localStorage.removeItem("isLoggedIn");
        // Redirect to login page
        window.location.href = "index.html";
    });

    // Initial setup: Show the first photo gallery by default
    showContent('photo-gallery1');
});

// Disable right-click context menu for images and videos
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
    }
});

// Disable drag and drop for all images
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', event => event.preventDefault());
    });
});
