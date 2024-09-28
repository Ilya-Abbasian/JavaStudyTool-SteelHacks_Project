// Show array section when the button is clicked
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
});

// Create interactive array and make it draggable
document.getElementById("create-array-btn").addEventListener("click", function() {
    const length = parseInt(document.getElementById("array-length").value);
    const type = document.getElementById("array-type").value;
    const arrayDisplay = document.getElementById("array-display");

    // Create array
    let array = [];
    for (let i = 0; i < length; i++) {
        if (type === "int") {
            array.push(0);
        } else if (type === "String") {
            array.push("");
        } else if (type === "boolean") {
            array.push(false);
        }
    }

    // Create the container for the entire array with one border and brackets
    const arrayContainer = document.createElement("div");
    arrayContainer.classList.add("bracketed-array-container");

    // Make the entire array container draggable
    arrayContainer.setAttribute("draggable", "true");

    // Left bracket for the entire array
    const leftBracket = document.createElement("span");
    leftBracket.classList.add("bracket");
    leftBracket.textContent = "[";

    // Right bracket for the entire array
    const rightBracket = document.createElement("span");
    rightBracket.classList.add("bracket");
    rightBracket.textContent = "]";

    // Append left bracket to the container
    arrayContainer.appendChild(leftBracket);

    // Create and display array elements without individual brackets
    array.forEach((item, index) => {
        const container = document.createElement("div");

        // Input field for array value
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = item;
        inputField.classList.add("array-element");

        // Dynamically adjust the input size based on the content
        inputField.setAttribute("size", inputField.value.length + 1); // Set initial size

        // Adjust size when input changes
        inputField.addEventListener("input", function() {
            inputField.setAttribute("size", this.value.length + 1); // Dynamically change size
            if (type === "int") {
                array[index] = parseInt(this.value) || 0;
            } else if (type === "String") {
                array[index] = this.value;
            } else if (type === "boolean") {
                array[index] = this.value.toLowerCase() === 'true';
            }
        });

        // Display index below each element
        const indexDisplay = document.createElement("div");
        indexDisplay.textContent = index;
        indexDisplay.classList.add("array-index");

        // Append input and index display to the container
        container.appendChild(inputField);
        container.appendChild(indexDisplay);

        // Append to the array container
        arrayContainer.appendChild(container);

        // Add comma after each element except the last one
        if (index < length - 1) {
            const comma = document.createElement("span");
            comma.textContent = ",";
            comma.classList.add("comma");
            arrayContainer.appendChild(comma);
        }
    });

    // Append right bracket to the container
    arrayContainer.appendChild(rightBracket);

    // Style adjustments for the array container
    arrayContainer.style.padding = "10px";
    arrayContainer.style.display = "flex";
    arrayContainer.style.alignItems = "center";
    arrayContainer.style.justifyContent = "center";
    arrayContainer.style.marginTop = "10px"; // Ensure some space between arrays
    
    // Append the new array container below existing arrays
    arrayDisplay.appendChild(arrayContainer);
});

// Clear all arrays
document.getElementById("clear-all-btn").addEventListener("click", function() {
    const arrayDisplay = document.getElementById("array-display");
    arrayDisplay.innerHTML = ''; // Clear the entire display
});
