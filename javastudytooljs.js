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

// Binary Search Tree Node class
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Function to insert node into the tree
function insertNode(root, value) {
    if (value < root.value) {
        if (root.left === null) {
            root.left = new TreeNode(value);
        } else {
            insertNode(root.left, value);
        }
    } else {
        if (root.right === null) {
            root.right = new TreeNode(value);
        } else {
            insertNode(root.right, value);
        }
    }
}

// Function to create tree elements dynamically in the DOM
function createTreeNodeElement(value) {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("tree-node");
    
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = value;
    inputField.disabled = true;
    inputField.classList.add("tree-node-input");

    nodeElement.appendChild(inputField);
    return nodeElement;
}

// Function to render the tree in the DOM
function renderTree(tree, parentElement) {
    if (!tree) return;

    // Create a main tree container for alignment
    const treeContainer = document.createElement("div");
    treeContainer.classList.add("tree-container");

    const nodeElement = createTreeNodeElement(tree.value);
    treeContainer.appendChild(nodeElement);

    if (tree.left || tree.right) {
        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("children-container");
        treeContainer.appendChild(childrenContainer);

        // Create a container for left and right branches
        const leftBranch = document.createElement("div");
        const rightBranch = document.createElement("div");

        if (tree.left) {
            leftBranch.classList.add("tree-branch-left");
            renderTree(tree.left, leftBranch);
        }

        if (tree.right) {
            rightBranch.classList.add("tree-branch-right");
            renderTree(tree.right, rightBranch);
        }

        childrenContainer.appendChild(leftBranch);
        childrenContainer.appendChild(rightBranch);
    }

    parentElement.appendChild(treeContainer); // Append the treeContainer to the parent
}

// Initialize tree root as null
let treeRoot = null;

// Handle adding nodes to the tree
document.getElementById("add-node-btn").addEventListener("click", function() {
    const value = parseInt(document.getElementById("tree-value").value);
    if (isNaN(value)) return;

    // Check if root is null
    if (treeRoot === null) {
        treeRoot = new TreeNode(value); // Create root node
    } else {
        insertNode(treeRoot, value); // Insert new value into the tree
    }

    const treeDisplay = document.getElementById("tree-display");
    treeDisplay.innerHTML = ''; // Clear existing tree display
    renderTree(treeRoot, treeDisplay); // Render updated tree
});

// Clear the tree
document.getElementById("clear-tree-btn").addEventListener("click", function() {
    treeRoot = null; // Reset the tree root
    const treeDisplay = document.getElementById("tree-display");
    treeDisplay.innerHTML = ''; // Clear the entire display
});
