// Show array section when the button is clicked
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
    document.getElementById("linkedlist-section").style.display = "none";
});

// Show linked list section when the button is clicked
document.getElementById("linkedlist-btn").addEventListener("click", function() {
    document.getElementById("linkedlist-section").style.display = "block";
    document.getElementById("array-section").style.display = "none";
});

// Create interactive array and make it draggable
document.getElementById("create-array-btn").addEventListener("click", function() {
    const length = parseInt(document.getElementById("array-length").value);
    const type = document.getElementById("array-type").value;
    const arrayDisplay = document.getElementById("array-display");

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

    const arrayContainer = document.createElement("div");
    arrayContainer.classList.add("bracketed-array-container");

    arrayContainer.setAttribute("draggable", "true");

    const leftBracket = document.createElement("span");
    leftBracket.classList.add("bracket");
    leftBracket.textContent = "[";

    const rightBracket = document.createElement("span");
    rightBracket.classList.add("bracket");
    rightBracket.textContent = "]";

    arrayContainer.appendChild(leftBracket);

    array.forEach((item, index) => {
        const container = document.createElement("div");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = item;
        inputField.classList.add("array-element");

        inputField.setAttribute("size", inputField.value.length + 1);
        inputField.addEventListener("input", function() {
            inputField.setAttribute("size", this.value.length + 1);
            if (type === "int") {
                array[index] = parseInt(this.value) || 0;
            } else if (type === "String") {
                array[index] = this.value;
            } else if (type === "boolean") {
                array[index] = this.value.toLowerCase() === 'true';
            }
        });

        const indexDisplay = document.createElement("div");
        indexDisplay.textContent = index;
        indexDisplay.classList.add("array-index");

        container.appendChild(inputField);
        container.appendChild(indexDisplay);

        arrayContainer.appendChild(container);

        if (index < length - 1) {
            const comma = document.createElement("span");
            comma.textContent = ",";
            comma.classList.add("comma");
            arrayContainer.appendChild(comma);
        }
    });

    arrayContainer.appendChild(rightBracket);

    arrayContainer.style.padding = "10px";
    arrayContainer.style.display = "flex";
    arrayContainer.style.alignItems = "center";
    arrayContainer.style.justifyContent = "center";
    arrayContainer.style.marginTop = "10px";

    arrayDisplay.appendChild(arrayContainer);
});

// Clear all arrays
document.getElementById("clear-all-btn").addEventListener("click", function() {
    const arrayDisplay = document.getElementById("array-display");
    arrayDisplay.innerHTML = ''; // Clear the entire display
});

// Create interactive linked list and make it draggable
document.getElementById("create-linkedlist-btn").addEventListener("click", function() {
    const length = parseInt(document.getElementById("linkedlist-length").value);
    const type = document.getElementById("linkedlist-type").value;
    const linkedlistDisplay = document.getElementById("linkedlist-display");

    let linkedList = [];
    for (let i = 0; i < length; i++) {
        if (type === "int") {
            linkedList.push(0);
        } else if (type === "String") {
            linkedList.push("");
        } else if (type === "boolean") {
            linkedList.push(false);
        }
    }

    const linkedListContainer = document.createElement("div");
    linkedListContainer.classList.add("linkedlist-container");
    linkedListContainer.setAttribute("draggable", "true");

    linkedList.forEach((item, index) => {
        const container = document.createElement("div");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = item;
        inputField.classList.add("linkedlist-node");

        inputField.setAttribute("size", inputField.value.length + 1);
        inputField.addEventListener("input", function() {
            inputField.setAttribute("size", this.value.length + 1);
            if (type === "int") {
                linkedList[index] = parseInt(this.value) || 0;
            } else if (type === "String") {
                linkedList[index] = this.value;
            } else if (type === "boolean") {
                linkedList[index] = this.value.toLowerCase() === 'true';
            }
        });

        container.appendChild(inputField);

        linkedListContainer.appendChild(container);

        if (index < length - 1) {
            const arrow = document.createElement("span");
            arrow.textContent = "→";
            arrow.classList.add("arrow");
            linkedListContainer.appendChild(arrow);
        }
    });

    linkedListContainer.style.padding = "10px";
    linkedListContainer.style.display = "flex";
    linkedListContainer.style.alignItems = "center";
    linkedListContainer.style.justifyContent = "center";
    linkedListContainer.style.marginTop = "10px";

    linkedlistDisplay.appendChild(linkedListContainer);
});

// Clear all linked lists
document.getElementById("clear-linklist-btn").addEventListener("click", function() {
    const linkedlistDisplay = document.getElementById("linkedlist-display");
    linkedlistDisplay.innerHTML = ''; // Clear the entire display
});
