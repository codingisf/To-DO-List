document.addEventListener('DOMContentLoaded', function() {
    const taskSubmitButton = document.getElementById('taskSubmit');

    if (taskSubmitButton) {
        taskSubmitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            // Get values from the input fields
            const taskName = document.getElementById('taskname').value;
            const description = document.getElementById('description').value;
            const note = document.getElementById('note').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Create a JSON object
            const taskData = {
                taskName: taskName,
                description: description,
                note: note,
                date: date,
                time: time
            };

            // Retrieve existing tasks or initialize as empty array
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(taskData);

            // Save updated tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            alert("task added Successfully")

            // Redirect to the task list page
            window.location.href = './index.html';
        });
    }

    // Function to get tasks from localStorage
    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to insert tasks into the table
    function insertTasksIntoTable(tasks) {
        const tableBody = document.getElementById('task-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center border border-green-700 px-5 py-2">${task.taskName}</td>
                <td class="text-center border border-green-700 px-5 py-2">${task.description}</td>
                <td class="text-center border border-green-700 px-5 py-2">${task.note}</td>
                <td class="text-center border border-green-700 px-5 py-2">${task.time}</td>
                <td class="text-center border border-green-700 px-5 py-2 flex justify-between">
                    <input type="checkbox" value="checked">
                    <button type="button" class="border px-2 py-1 rounded-md border-red-600 bg-red-200 hover:bg-red-300" onclick="deleteTask(this)">❌</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to delete a task
    window.deleteTask = function(button) {
        const row = button.closest('tr');
        const taskName = row.cells[0].textContent;
        
        // Get tasks from localStorage
        let tasks = getTasksFromLocalStorage();

        // Remove the task from the array
        tasks = tasks.filter(task => task.taskName !== taskName);

        // Save updated tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Re-render the tasks
        insertTasksIntoTable(tasks);
    }

    // Initialize the table with tasks from localStorage
    const tasks = getTasksFromLocalStorage();
    insertTasksIntoTable(tasks);
});
