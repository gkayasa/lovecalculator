// Get references to all sections and elements
const introSection = document.getElementById('intro-section');
const inputSection = document.getElementById('input-section');
const loadingSection = document.getElementById('loading-section');
const resultsSection = document.getElementById('results-section');

const startBtn = document.getElementById('start-btn');
const calculateBtn = document.getElementById('calculate-btn');
const recalculateBtn = document.getElementById('recalculate-btn');

const yourNameInput = document.getElementById('your-name');
const partnerNameInput = document.getElementById('partner-name');

const progressBar = document.getElementById('progress-bar');
const percentageDisplay = document.getElementById('percentage-display');

const resultPercentageElement = document.getElementById('result-percentage');
const namesDisplayElement = document.getElementById('names-display'); // Reference to the new element
const resultMessageElement = document.getElementById('result-message');

let lovePercentage = 0; // Store the calculated percentage

/**
 * Hides all sections and displays the specified section.
 * @param {HTMLElement} sectionToActivate - The section element to make active.
 */
function showSection(sectionToActivate) {
    // Hide all sections first
    [introSection, inputSection, loadingSection, resultsSection].forEach(section => {
        section.classList.remove('active');
    });
    // Show the target section
    sectionToActivate.classList.add('active');
}

/**
 * Capitalizes the first letter of each word in a given string.
 * @param {string} str - The input string.
 * @returns {string} - The string with the first letter of each word capitalized.
 */
function capitalizeEachWord(str) {
    if (!str) return '';
    return str.split(' ').map(word => {
        if (!word) return ''; // Handle multiple spaces
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

/**
 * Calculates the love percentage based on two names.
 * This is a simple, fun algorithm and not based on any real science.
 * @param {string} name1 - The first name.
 * @param {string} name2 - The second name.
 * @returns {number} - The calculated love percentage (0-100).
 */
function calculateLovePercentage(name1, name2) {
    // Combine names and convert to lowercase for consistent calculation
    const combinedNames = (name1 + name2).toLowerCase();
    let sum = 0;

    // Sum the ASCII values of characters
    for (let i = 0; i < combinedNames.length; i++) {
        sum += combinedNames.charCodeAt(i);
    }

    // A simple algorithm to get a percentage between 0 and 100
    // Using a prime number (97) for modulo to distribute results more evenly
    // Adding a small constant to make 0% less likely and ensure some variation.
    let percentage = (sum % 97) + 5; // Ensures a minimum of 5%
    percentage = Math.min(percentage, 100); // Cap at 100%

    // Introduce a slight "randomness" based on length difference for fun
    const lengthDiff = Math.abs(name1.length - name2.length);
    if (lengthDiff > 5) { // If names are very different in length
        percentage = Math.max(5, percentage - (lengthDiff * 2)); // Reduce percentage
    } else if (lengthDiff <= 2 && percentage < 90) { // If names are similar in length, boost slightly
        percentage = Math.min(100, percentage + 5);
    }

    return percentage;
}

/**
 * Provides a message based on the love percentage.
 * @param {number} percentage - The love percentage.
 * @returns {string} - A descriptive message.
 */
function getLoveMessage(percentage) {
    if (percentage >= 90) {
        return "A perfect match! Soulmates forever!";
    } else if (percentage >= 70) {
        return "Great compatibility! A strong bond is forming.";
    } else if (percentage >= 50) {
        return "Good potential! Keep nurturing your connection.";
    } else if (percentage >= 30) {
        return "There's room to grow. Communication is key!";
    } else {
        return "Opposites attract, or perhaps it's just a friendly vibe!";
    }
}

/**
 * Handles the "Calculate Love" button click.
 * Validates inputs, calculates love, and starts the loading animation.
 */
function handleCalculateLove() {
    const yourName = yourNameInput.value.trim();
    const partnerName = partnerNameInput.value.trim();

    if (!yourName || !partnerName) {
        alert("Please enter both names to calculate your love score!");
        return;
    }

    lovePercentage = calculateLovePercentage(yourName, partnerName);
    showSection(loadingSection);
    startLoadingAnimation();
}

/**
 * Starts the loading bar animation and updates the percentage text.
 * Transitions to the results section upon completion.
 */
function startLoadingAnimation() {
    let currentProgress = 0;
    progressBar.style.width = '0%';
    percentageDisplay.textContent = '0%';

    const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 5) + 1; // Increment by a random small amount
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setTimeout(() => {
                displayResults();
            }, 500); // Small delay before showing results
        }

        progressBar.style.width = `${currentProgress}%`;
        percentageDisplay.textContent = `${currentProgress}%`;
    }, 80); // Update every 80ms for smoother animation
}

/**
 * Displays the calculated results in the results section.
 */
function displayResults() {
    resultPercentageElement.textContent = `${lovePercentage}%`;
    // Capitalize the first letter of each word in the names before displaying
    const capitalizedYourName = capitalizeEachWord(yourNameInput.value.trim());
    const capitalizedPartnerName = capitalizeEachWord(partnerNameInput.value.trim());
    namesDisplayElement.textContent = `${capitalizedYourName} + ${capitalizedPartnerName}`;
    resultMessageElement.textContent = getLoveMessage(lovePercentage);
    showSection(resultsSection);
}

// Event Listeners
startBtn.addEventListener('click', () => {
    showSection(inputSection);
    yourNameInput.focus(); // Focus on the first input field
});

calculateBtn.addEventListener('click', handleCalculateLove);

recalculateBtn.addEventListener('click', () => {
    // Clear input fields
    yourNameInput.value = '';
    partnerNameInput.value = '';
    // Reset progress bar
    progressBar.style.width = '0%';
    percentageDisplay.textContent = '0%';
    // Clear names display
    namesDisplayElement.textContent = '';
    // Go back to the input section
    showSection(inputSection);
    yourNameInput.focus();
});

// Initial setup: Ensure intro section is active on load
document.addEventListener('DOMContentLoaded', () => {
    showSection(introSection);
});
