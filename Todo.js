const todoArray = JSON.parse(localStorage.getItem('todoList')) || []; // Load from local storage
const inputElement = document.querySelector('input');
const searchButton = document.querySelector('.js-searchbtn');
const todoItemsContainer = document.querySelector('.todoitems');

// ✅ Handle "Enter" Key Press
inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItems();
    }
});

// ✅ Function to render the list from array
function renderTodoList() {
    let html = '';
    todoArray.forEach(function (item, index) {
        html += `
            <p>
                <img class="toggle-image" src="${item.checked ? 'images/checked.png' : 'images/unchecked.png'}" data-index="${index}">
                <span class="${item.checked ? 'completed-task' : ''}">${item.task}</span>
                <span class="cross-button" data-index="${index}">x</span>
            </p>`;
    });
    todoItemsContainer.innerHTML = html;
}

// ✅ Initial rendering of saved tasks
renderTodoList();

// ✅ Function to Add Task
function addItems() {
    if (inputElement.value.trim() === '') {
        alert('Please add something');
        return;
    }
    todoArray.push({ task: inputElement.value, checked: false });
    localStorage.setItem('todoList', JSON.stringify(todoArray)); // Save to local storage
    renderTodoList();
    inputElement.value = ''; // Clear input field
}

// ✅ Add Task on Button Click
searchButton.addEventListener('click', addItems);

// ✅ Handle Click Events (Toggle & Delete)
todoItemsContainer.addEventListener('click', function (event) {
    const index = event.target.dataset.index;
    
    // ✅ Toggle Task Completion
    if (event.target.classList.contains('toggle-image')) {
        todoArray[index].checked = !todoArray[index].checked;
        localStorage.setItem('todoList', JSON.stringify(todoArray)); // Update local storage
        renderTodoList();
    }

    // ✅ Remove Task
    if (event.target.classList.contains('cross-button')) {
        todoArray.splice(index, 1); // Remove task from array
        localStorage.setItem('todoList', JSON.stringify(todoArray)); // Update local storage
        renderTodoList();
    }
});
