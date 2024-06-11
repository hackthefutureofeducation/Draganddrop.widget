function animateStar() {
    const container = document.getElementsByClassName('star-container')[0];
    container.classList.add('active');
    // Remove the class after animation completes to reset state
    setTimeout(() => {
        container.classList.remove('active');
    }, 2000); // Match this duration to the CSS animation duration
}

let dragged; // To keep track of what's being dragged

function onDragStart(event) {
    let target = event.target;
    if (target && target.classList.contains('item')) { // Check if the dragged element is an item
        dragged = target;
        event.dataTransfer.setData('text', target.textContent); // Set the data to be transferred
        event.dataTransfer.dropEffect = 'move';
        // Make it half transparent
        target.style.opacity = 0.3;
    }
}

function onDragEnd(event) {
    if (event.target && event.target.classList.contains('item')) {
        // Reset the transparency
        event.target.style.opacity = ''; // Reset opacity when drag ends 
        dragged = null;
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    console.log("Drop event triggered");
    if (dragged) {
        const data = event.dataTransfer ? event.dataTransfer.getData('text') : dragged.textContent;
        const box = event.target.closest('.box');
        if (box) {
            if (box.getAttribute('data-answer') == dragged.getAttribute('data-answer')) {
                box.textContent = data;
                animateStar();
            }
        }
    }

    // Check if all boxes are filled
    const boxes = document.querySelectorAll('.box');
    let allBoxesFilled = true;
    boxes.forEach(box => {
        if (box.textContent.trim() === '') {
            allBoxesFilled = false;
        }
    });

    if (allBoxesFilled) {
        document.getElementById('animation').href = "./src/fire.css";
    }
}

// Touch event handlers
function onTouchStart(event) {
    let target = event.target;
    if (target && target.classList.contains('item')) {
        dragged = target;
        target.style.opacity = 0.3;
    }
}

function onTouchMove(event) {
    event.preventDefault();
}

function onTouchEnd(event) {
    let target = event.target;
    if (target && target.classList.contains('item')) {
        target.style.opacity = ''; // Reset opacity when drag ends 
        dragged = null;
    }
}

function onTouchDrop(event) {
    event.preventDefault();
    if (dragged) {
        const data = dragged.textContent;
        const touch = event.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY).closest('.box');
        if (dropTarget) {
            if (dropTarget.getAttribute('data-answer') == dragged.getAttribute('data-answer')) {
                dropTarget.textContent = data;
                animateStar();
            }
        }

        // Check if all boxes are filled
        const boxes = document.querySelectorAll('.box');
        let allBoxesFilled = true;
        boxes.forEach(box => {
            if (box.textContent.trim() === '') {
                allBoxesFilled = false;
            }
        });

        if (allBoxesFilled) {
            document.getElementById('animation').href = "./src/fire.css";
        }
    }
}

// Adding event listeners for all items
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', onDragEnd);
    item.addEventListener('touchstart', onTouchStart);
    item.addEventListener('touchmove', onTouchMove);
    item.addEventListener('touchend', onTouchEnd);
});

// Adding event listener for the dropzone
const dropzones = document.querySelectorAll('.dropzone');
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', allowDrop);
    dropzone.addEventListener('drop', onDrop);
    dropzone.addEventListener('touchend', onTouchDrop);
});
