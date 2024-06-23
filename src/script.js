// JavaScript
function animateStar() {
    const container = document.getElementsByClassName('star-container')[0]
    container.classList.add('active')
    // Remove the class after animation completes to reset state
    setTimeout(() => {
        container.classList.remove('active')
    }, 2000); // Match this duration to the CSS animation duration
}
let dragged; // to keep track of what's being dragged, we'll use this later! 

function onDragStart(event) {
    let target = event.target;
    if (target && target.classList.contains('item')) { // Check if the dragged element is an item
        dragged = target;
        event.dataTransfer.setData('text', target.textContent); // Set the data to be transferred
        event.dataTransfer.dropEffect = 'move';
        // Make it half transparent
        event.target.style.opacity = .3;
    }
}

function onDragEnd(event) {
    if (event.target && event.target.classList.contains('item')) {
        // Reset the transparency
        event.target.style.opacity = ''; // reset opacity when drag ends 
        dragged = null;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function onDrop(ev) {
    ev.preventDefault();
    console.log("Drop event triggered");
    if (dragged) {
        const data = ev.dataTransfer.getData('text');
        const box = ev.target.closest('.box');
        if (box) {

            if (box.getAttribute('data-answer') == dragged.getAttribute('data-answer')) {
                box.textContent = data;
                animateStar();
            }
        }
    }

    const boxes = document.querySelectorAll('.box');
    let allBoxesFilled = true;
    boxes.forEach(box => {
        if (box.textContent.trim() === '') {
            allBoxesFilled = false;
        }
    });

    if (allBoxesFilled) {
        const container = document.getElementsByClassName('star-container')[1]
        container.classList.add('active')
    }
}
// Adding event listeners for all items
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragend', onDragEnd);
});

// Adding event listener for the dropzone
const dropzones = document.querySelectorAll('.dropzone');
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', allowDrop);
    dropzone.addEventListener('drop', onDrop);
})

