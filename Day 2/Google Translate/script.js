async function loadTargetLanguage() {
    const url = "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages";
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "f95540051dmsh5bc4447a53bc30dp1b09afjsn82cbb3fc60d3",
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const languages = await response.json();

        const sourceLanguage = document.getElementById("sourceLanguage");
        const targetLanguage = document.getElementById("targetLanguage");

        sourceLanguage.innerHTML = "";
        targetLanguage.innerHTML = "";

        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "auto";
        defaultOption.textContent = "Auto Detect";
        sourceLanguage.appendChild(defaultOption);

        languages.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.code;
            option.textContent = element.language;
            sourceLanguage.appendChild(option);
            targetLanguage.appendChild(option.cloneNode(true));
        });

        // Set default target language to English
        targetLanguage.value = "en";
        
        // Add character count listener
        document.getElementById("source").addEventListener("input", updateCharCount);
    } catch (error) {
        console.error(error);
    }
}

function updateCharCount() {
    const source = document.getElementById("source");
    const charCount = document.getElementById("sourceCharCount");
    const maxLength = 5000;
    const currentLength = source.value.length;
    
    charCount.textContent = `${currentLength}/${maxLength}`;
    
    if (currentLength > maxLength) {
        charCount.style.color = "var(--error-color)";
    } else {
        charCount.style.color = "var(--dark-gray)";
    }
}

function swapLanguages() {
    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");
    const sourceText = document.getElementById("source");
    const targetText = document.getElementById("target");
    
    // Swap languages
    const tempLang = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = tempLang;
    
    // Swap text
    const tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;
    
    // Update character count
    updateCharCount();
}

function clearSource() {
    document.getElementById("source").value = "";
    updateCharCount();
}

function copyTranslation() {
    const targetText = document.getElementById("target");
    targetText.select();
    document.execCommand("copy");
    
    // Show feedback
    const copyBtn = document.querySelector(".copy-btn");
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
}

async function convert() {
    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");
    const source = document.getElementById("source");
    const target = document.getElementById("target");
    const translateBtn = document.querySelector(".translate-btn");

    // Validate input
    if (!source.value.trim()) {
        target.value = "";
        return;
    }

    // Show loading state
    const originalBtnText = translateBtn.innerHTML;
    translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
    translateBtn.disabled = true;

    const url = "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": "f95540051dmsh5bc4447a53bc30dp1b09afjsn82cbb3fc60d3",
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: sourceLanguage.value === "auto" ? "" : sourceLanguage.value,
            to: targetLanguage.value,
            text: source.value,
        }),
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.trans) {
            target.value = result.trans;
        } else {
            target.value = "Translation not available";
            console.log("Full API response:", result);
        }
    } catch (error) {
        console.error(error);
        target.value = "Error occurred during translation";
    } finally {
        // Restore button state
        translateBtn.innerHTML = originalBtnText;
        translateBtn.disabled = false;
    }
}

// Initialize the app
loadTargetLanguage();