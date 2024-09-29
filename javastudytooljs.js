// Show array section when the button is clicked
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
    document.getElementById("linkedlist-section").style.display = "none";
    document.getElementById("tree-section").style.display = "none"; // Hide tree section
});

// Show linked list section when the button is clicked
document.getElementById("linkedlist-btn").addEventListener("click", function() {
    document.getElementById("linkedlist-section").style.display = "block";
    document.getElementById("array-section").style.display = "none";
    document.getElementById("tree-section").style.display = "none"; // Hide tree section
});

// Show tree section when the button is clicked
document.getElementById("tree-btn").addEventListener("click", function() {
    document.getElementById("tree-section").style.display = "block";
    document.getElementById("array-section").style.display = "none";
    document.getElementById("linkedlist-section").style.display = "none"; // Hide other sections
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
    const value = document.getElementById("linkedlist-value").value; // Get the node value
    const linkedlistDisplay = document.getElementById("linkedlist-display");

    const linkedListContainer = document.createElement("div");
    linkedListContainer.classList.add("linkedlist-container");
    linkedListContainer.setAttribute("draggable", "true");

    const container = document.createElement("div");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = value;
    inputField.classList.add("linkedlist-node");

    inputField.setAttribute("size", inputField.value.length + 1);
    inputField.addEventListener("input", function() {
        inputField.setAttribute("size", this.value.length + 1);
    });

    container.appendChild(inputField);
    linkedListContainer.appendChild(container);

    if (linkedlistDisplay.children.length > 0) {
        const arrow = document.createElement("span");
        arrow.textContent = "→";
        arrow.classList.add("arrow");
        linkedListContainer.appendChild(arrow);
    }

    linkedListContainer.appendChild(container);
    linkedlistDisplay.appendChild(linkedListContainer);
});

// Clear all linked lists
document.getElementById("clear-linklist-btn").addEventListener("click", function() {
    const linkedlistDisplay = document.getElementById("linkedlist-display");
    linkedlistDisplay.innerHTML = ''; // Clear the entire display
});

// Create interactive binary tree and display it
document.getElementById("add-node-btn").addEventListener("click", function() {
    const value = parseInt(document.getElementById("tree-value").value); // Get the node value
    const treeDisplay = document.getElementById("tree-display");

    const treeNode = document.createElement("div");
    treeNode.classList.add("tree-node");
    treeNode.textContent = value;

    if (treeDisplay.children.length === 0) {
        treeDisplay.appendChild(treeNode); // Add first node
    } else {
        // Logic to insert the new node into the tree goes here
        // For simplicity, we are just adding to the end for now
        treeDisplay.appendChild(treeNode);
    }

    document.getElementById("tree-value").value = ""; // Clear input field
});

// Clear all nodes from the tree
document.getElementById("clear-tree-btn").addEventListener("click", function() {
    const treeDisplay = document.getElementById("tree-display");
    treeDisplay.innerHTML = ''; // Clear the entire display
});