document.addEventListener('DOMContentLoaded', () => {
    const wasteImageInput = document.getElementById('waste-image');
    const previewImg = document.getElementById('preview-img');
    const ewasteForm = document.getElementById('ewaste-form');

    // Function to handle image preview and save to localStorage
    const handleImagePreview = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Set preview image
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';

                // Store the image data URL in localStorage
                localStorage.setItem('wasteImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Event listener for image input change
    wasteImageInput.addEventListener('change', handleImagePreview);

    // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(ewasteForm);
        const formEntries = {};
        for (const [key, value] of formData.entries()) {
            formEntries[key] = value;
        }

        // Store form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formEntries));

        // Store the current timestamp
        const timestamp = new Date().toLocaleString();
        localStorage.setItem('submissionTime', timestamp);

        // Display success message
        alert(`Thank you for submitting your e-waste on ${timestamp}. Your contribution matters!`);

        // Redirect to the shipped order page
        window.location.href = 'shipped_order.html';
    };

    // Attach form submission event listener
    ewasteForm.addEventListener('submit', handleFormSubmit);
});
