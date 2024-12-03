// UID map
const uidToPageMap = {
    "miyuki.html": ["64019CB0", "175647BF", "F22F47BF", "996947BF", "97C447BF", "04DE5AA0672681"],
    "rune.html": ["B405A0B0", "CB9B4ABF", "1D044BBF"],
    "gita.html": ["B4C3A1B0", "C37947BF", "0BA547BF"]
};

// Elements
const iphoneButton = document.getElementById('iphoneButton');
const iphoneSection = document.getElementById('iphoneSection');
const submitUidButton = document.getElementById('submitUidButton');
const uidInput = document.getElementById('uidInput');
const statusDiv = document.getElementById('status');

// Show input section for iPhone
iphoneButton.addEventListener('click', () => {
    iphoneSection.style.display = 'block';
});

// Handle UID submission
submitUidButton.addEventListener('click', () => {
    const uid = uidInput.value.trim().toUpperCase();

    if (uid) {
        let redirectTo = null;
        for (const [page, uids] of Object.entries(uidToPageMap)) {
            if (uids.includes(uid)) {
                redirectTo = page;
                break;
            }
        }

        if (redirectTo) {
            statusDiv.textContent = "Access granted. Redirecting...";
            setTimeout(() => {
                window.location.href = redirectTo;
            }, 1000);
        } else {
            statusDiv.textContent = "Access denied: Invalid UID.";
        }
    } else {
        statusDiv.textContent = "Please enter a valid UID.";
    }
});
