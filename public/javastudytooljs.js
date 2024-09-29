document.addEventListener('DOMContentLoaded', function() {

//hi this is a test
// upon clicking array button:
document.getElementById("array-btn").addEventListener("click", function() {
    document.getElementById("array-section").style.display = "block";
    document.getElementById("linkedlist-section").style.display = "none";
    document.getElementById("tree-section").style.display = "none"; // Hide tree section
});

// upon clicking linkedlist button:
document.getElementById("linkedlist-btn").addEventListener("click", function() {
    document.getElementById("linkedlist-section").style.display = "block";
    document.getElementById("array-section").style.display = "none";
    document.getElementById("tree-section").style.display = "none"; // Hide tree section
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

    // Generate the Java initialization code
    let initializationCode;
    switch (type) {
        case 'int':
            initializationCode = `int[] myArray = new int[${length}];`;
            break;
        case 'String':
            initializationCode = `String[] myArray = new String[${length}];`;
            break;
        case 'boolean':
            initializationCode = `boolean[] myArray = new boolean[${length}];`;
            break;
        default:
            initializationCode = '';
    }

    // Display the initialization code
    const codeDisplay = document.getElementById('array-initialization-code');
    codeDisplay.innerHTML = `<pre>${initializationCode}</pre>`;
});

// Clear all arrays
document.getElementById("clear-all-btn").addEventListener("click", function() {
    const arrayDisplay = document.getElementById("array-display");
    arrayDisplay.innerHTML = ''; // Clear the entire display
    const codeDisplay = document.getElementById('array-initialization-code');
    codeDisplay.innerHTML = ''; // Clear the initialization code display
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

//--------------------------------
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
let isDrawingEnabled = false; // Drawing is disabled by default

// Resizing the canvas
// Resizing the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // Remove the offset for the toolbar
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Call this to set the size initially

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

// Enable drawing functionality when the button is pressed
// Enable drawing functionality when the button is pressed
document.getElementById('enable-draw').addEventListener('click', () => {
    isDrawingEnabled = !isDrawingEnabled; // Toggle drawing state
    
    if (isDrawingEnabled) {
        document.getElementById('enable-draw').textContent = 'Disable Drawing';
        canvas.style.pointerEvents = 'auto'; // Enable canvas interaction
    } else {
        document.getElementById('enable-draw').textContent = 'Enable Drawing';
        canvas.style.pointerEvents = 'none'; // Disable canvas interaction
    }
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('stroke').addEventListener('change', e => {
    ctx.strokeStyle = e.target.value;
});

document.getElementById('lineWidth').addEventListener('change', e => {
    lineWidth = parseInt(e.target.value);
});

// Update the draw function to use the original mouse coordinates
const draw = (e) => {
    if (!isPainting || !isDrawingEnabled) return; // Draw only when painting and enabled

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY); // Remove offset adjustment here
    ctx.stroke();
};

canvas.addEventListener('mousedown', (e) => {
    if (!isDrawingEnabled) return; // Only allow drawing if enabled

    isPainting = true;
    startX = e.clientX;
    startY = e.clientY; // No offset adjustment
    ctx.moveTo(startX, startY);
});

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
  
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const message = chatInput.value;
      if (message.trim() === '') return;
  
      displayMessage('User', message);
  
      fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      .then(response => response.json())
      .then(data => {
        displayMessage('AI', data.response);
      })
      .catch(error => {
        console.error('Error:', error);
        displayMessage('AI', 'Sorry, there was an error processing your request.');
      });
  
      chatInput.value = '';
    }
  
    function displayMessage(sender, message) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `${sender}: ${message}`;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
// Chat functionality
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value;
    if (message.trim() === '') return;

    displayMessage('User', message);

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('AI', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('AI', 'Sorry, there was an error processing your request.');
    });

    chatInput.value = '';
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

});