const qrText = document.getElementById('qrText');
const qrImage = document.getElementById('qrImage');
const qrContainer = document.querySelector('.qr-result');
const downloadLink = document.getElementById('downloadLink');
const qrPlaceholder = document.querySelector('.qr-placeholder');

function GenerateQRCode() {
    const inputValue = qrText.value.trim();
    
    if (inputValue.length === 0) {
        alert('Please enter some text or URL');
        return;
    }

    // Show loading state (you could add a spinner here)
    qrContainer.classList.add('generating');
    
    // Generate QR code
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputValue)}`;
    
    qrImage.onload = function() {
        // Hide placeholder and show QR code
        qrPlaceholder.style.display = 'none';
        qrImage.style.display = 'block';
        downloadLink.style.display = 'flex';
        
        // Set download link
        downloadLink.href = qrImage.src;
        downloadLink.download = `qr-code-${Date.now()}.png`;
        
        qrContainer.classList.remove('generating');
    };
    
    qrImage.onerror = function() {
        alert('Error generating QR code. Please try again.');
        qrContainer.classList.remove('generating');
    };
}

// Optional: Generate QR code on Enter key press
qrText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        GenerateQRCode();
    }
});