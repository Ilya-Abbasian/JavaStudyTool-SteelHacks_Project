// Toggle light/dark mode
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle the dark-mode class

    // Update the button text
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = 'Light Mode'; // Change to light mode
    } else {
        themeToggleButton.textContent = 'Dark Mode'; // Change to dark mode
    }
});

// Show the array section when the array button is clicked
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
});




// Show the array section when the array button is clicked
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
});

// Create interactive array
document.getElementById("create-array-btn").addEventListener("click", function() {
    const length = parseInt(document.getElementById("array-length").value);
    const type = document.getElementById("array-type").value;
    const arrayDisplay = document.getElementById("array-display");

    // Clear previous array display
    arrayDisplay.innerHTML = '';

    // Create array based on the type
    let array = [];
    for (let i = 0; i < length; i++) {
        if (type === "int") {
            array.push(0); // Initialize with 0 for integers
        } else if (type === "String") {
            array.push(""); // Initialize with empty string for Strings
        } else if (type === "boolean") {
            array.push(false); // Initialize with false for booleans
        }
    }

    // Display the array with brackets, editable fields, and indices
    array.forEach((item, index) => {
        // Create the bracketed array element container
        const container = document.createElement("div");
        container.classList.add("bracketed-array-element");

        // Left bracket
        const leftBracket = document.createElement("span");
        leftBracket.textContent = "[";
        container.appendChild(leftBracket);

        // Input field for array value
        const inputField = document.createElement("input");
        inputField.type = "text"; // Use text for manual input (even for numbers)
        inputField.value = item;
        inputField.setAttribute("data-index", index);
        inputField.classList.add("array-element");

        // Update array on input change
        inputField.addEventListener("input", function() {
            const index = this.getAttribute("data-index");
            if (type === "int") {
                // Validate for integers
                const value = this.value;
                array[index] = value.match(/^-?\d*$/) ? parseInt(value) || 0 : 0; // Allow negative numbers
            } else if (type === "String") {
                array[index] = this.value; // Store as string
            } else if (type === "boolean") {
                array[index] = this.value.toLowerCase() === 'true'; // Store as boolean
            }
        });

        container.appendChild(inputField);

        // Right bracket
        const rightBracket = document.createElement("span");
        rightBracket.textContent = "]";
        container.appendChild(rightBracket);

        // Index display below the element
        const indexDisplay = document.createElement("div");
        indexDisplay.textContent = index;
        indexDisplay.classList.add("array-index");
        container.appendChild(indexDisplay);

        // Append the container to the display area
        arrayDisplay.appendChild(container);
    });
});
