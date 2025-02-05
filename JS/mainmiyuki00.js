document.getElementById('showImageButton').addEventListener('click', () => {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear any existing image

    const img = document.createElement('img');
    img.src = './Photo/Miyuki/miyuki-nicole01.jpg'; // Replace with the correct relative path to your image
    img.alt = 'Placeholder Image';
    img.style.width = '300px';
    img.style.height = 'auto';

    imageContainer.appendChild(img);
});
