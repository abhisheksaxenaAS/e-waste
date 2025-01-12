function initShippedOrder() {
    // Retrieve and display previously stored data
    const userName = localStorage.getItem('userName') || '';
    const eWasteType = localStorage.getItem('eWasteType') || '';
    const amount = localStorage.getItem('amount') || '0';
    const weight = localStorage.getItem('weight') || '0';
    const accountNumber = localStorage.getItem('accountNumber') || '';
    const ifscCode = localStorage.getItem('ifscCode') || '';

    // Populate input fields and spans with retrieved data
    document.getElementById('userName').value = userName;
    document.getElementById('eWasteType').textContent = eWasteType;
    document.getElementById('amount').textContent = amount;
    document.getElementById('weight').textContent = weight;
    document.getElementById('accountNumberInput').value = accountNumber;
    document.getElementById('ifscCodeInput').value = ifscCode;

    // Add event listener for the Confirm button
    document.querySelector('.confirm-button').addEventListener('click', () => {
        // Validate required fields
        const updatedUserName = document.getElementById('userName').value.trim();
        const updatedAccountNumber = document.getElementById('accountNumberInput').value.trim();
        const updatedIfscCode = document.getElementById('ifscCodeInput').value.trim();

        if (!updatedUserName || !updatedAccountNumber || !updatedIfscCode) {
            alert('Please fill in all required fields!');
            return;
        }

        // Store updated details in localStorage
        localStorage.setItem('userName', updatedUserName);
        localStorage.setItem('accountNumber', updatedAccountNumber);
        localStorage.setItem('ifscCode', updatedIfscCode);

        // Redirect to the confirmation page
        alert('Order confirmed! Redirecting to the confirmation page...');
        window.location.href = "confirmation.html";
    });

    // Initialize Google Map
    initMap();
}

function initMap() {
    // Check for Geolocation support
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Initialize map
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: latitude, lng: longitude },
                    zoom: 15
                });

                // Add marker
                new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map
                });
            },
            () => {
                alert('Geolocation access denied or unavailable.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Initialize the shipped order page functionality
document.addEventListener('DOMContentLoaded', initShippedOrder);
