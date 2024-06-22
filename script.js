const inputbox = document.getElementById("input-box");
const tasklist = document.getElementById("task-list");

function addTask() {
    if (inputbox.value === '') {
        alert("you need to write something");
    } else {
        let li = document.createElement("li");

        let p = document.createElement('p');
        p.innerHTML = inputbox.value;

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('list-btn');
        deleteBtn.classList.add('red'); 
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";

        let editBtn = document.createElement('button');
        editBtn.classList.add('list-btn');
        editBtn.classList.add('green'); 
        editBtn.innerHTML = "<i class='fa-solid fa-edit'></i>";

        // Add onclick event to remove the list item
        deleteBtn.onclick = function() {
            li.remove();
            save(); // Save the updated list to localStorage
        };

        // Add onclick event to edit the task
        editBtn.onclick = function() {
            let newText = prompt("Edit your task:", p.innerHTML);
            if (newText !== null && newText !== '') {
                p.innerHTML = newText;
                save(); // Save the updated list to localStorage
            }
        };

        li.appendChild(p);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        
        tasklist.appendChild(li);
    }
    inputbox.value = '';
    save();
}

function save() {
    localStorage.setItem("data", tasklist.innerHTML);
}

function show() {
    tasklist.innerHTML = localStorage.getItem("data");
    // Reassign click event handlers to buttons after reloading from localStorage
    let deleteButtons = tasklist.getElementsByClassName('red');
    for (let btn of deleteButtons) {
        btn.onclick = function() {
            this.parentElement.remove();
            save();
        };
    }

    let editButtons = tasklist.getElementsByClassName('blue');
    for (let btn of editButtons) {
        btn.onclick = function() {
            let p = this.parentElement.querySelector('p');
            let newText = prompt("Edit your task:", p.innerHTML);
            if (newText !== null && newText !== '') {
                p.innerHTML = newText;
                save();
            }
        };
    }
}

show();
