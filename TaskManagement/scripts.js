// Lấy các phần tử từ DOM
const inputTask = document.querySelector('.todo-input');
const formElement = document.querySelector('form');
const todoList = document.querySelector('.todo-list');
formElement.addEventListener('submit', addTask); // Lăng nghe sự kiện submit từ form
// Thêm task mới vào danh sách
function addTask(e){
    e.preventDefault(); // Ngăn tải lại trang
    const taskText = inputTask.value.trim();
    if(!taskText){
        alert('Please enter a task');
        return;
    }
    // Add task vào danh sách
    // Tạo Div bao quanh
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    saveLocalTodos(taskText);
    inputTask.value = '';
    //Tạo Li chứa nội dung
    const newTodo = document.createElement('li');
    newTodo.innerText = taskText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // gắn li vào div
    //Tạo nút hoàn thành
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn); // gắn vào div
    // Tạo nút Sửa (Edit)
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-pen"></i>'; // Icon cây bút
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //Tạo nút xóa
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn); // gắn vào div
    //Gắn tất cả vào danh sách chính
    todoList.appendChild(todoDiv);
}
todoList.addEventListener('click',function(e){
    const item = e.target;
    const trashButton = item.closest('.trash-btn');
    // Xử lý nút xóa
    if(trashButton != null){
        const todo = trashButton.parentElement;
        todo.remove();
    }
    // Xử lý nút hoàn thành
    const completeButton = item.closest('.complete-btn');
    if(completeButton != null){
        const todo = completeButton.parentElement;
        todo.classList.toggle('completed');
    }
    const editBtn = item.closest('.edit-btn');
    if (editBtn) {
        const todoDiv = editBtn.parentElement; // Lấy thẻ cha div.todo
        const todoItem = todoDiv.querySelector('.todo-item'); // Lấy thẻ li chứa chữ
        todoItem.contentEditable = true; // Cho phép chỉnh sửa
        todoItem.focus();
    // Bắt sự kiện khi click ra ngoài (blur) thì lưu lại
    todoItem.addEventListener('blur', function() {
        todoItem.contentEditable = false; // Tắt sửa
        editLocalTodos(editBtn.parentElement); // Gọi hàm lưu (truyền cả cái thẻ div cha vào)
    }, { once: true }); //Chỉ chạy 1 lần để tránh lỗi lặp sự kiện     
    }
});
// Local Storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        // Nếu đã có, lấy ra và parse nó
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // them viec moi
    todos.push(todo);
    // Luu lai
    localStorage.setItem('todos', JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getTodos);
function getTodos() {
    // 1. Lấy dữ liệu từ kho
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // tao lai giao dien
    todos.forEach(function(todo) {
        // Tạo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Tạo Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Nút Hoàn thành
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Tạo nút Sửa (Edit)
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pen"></i>'; 
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        // Nút Xóa
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Gắn vào danh sách
        todoList.appendChild(todoDiv);
    });
}
// Xu ly filter
const filterOption = document.querySelector(".filter-todo");
filterOption.addEventListener('change', filterTodo);
function filterTodo(e) {
    const todos = todoList.childNodes;  
    todos.forEach(function(todo) {
        // Kiểm tra xem đó có phải là thẻ Element không (để tránh lỗi text node trống)
        if (todo.nodeType === 1) { 
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
}
function editLocalTodos(todoDiv) {
    //Lấy dữ liệu cũ
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //Tìm vị trí (Index) của công việc này trong danh sách
    // Dùng Array.from để biến danh sách thẻ HTML thành mảng để tìm index
    const todoIndex = Array.from(todoList.children).indexOf(todoDiv);

    //Cập nhật nội dung mới vào mảng
    //todoDiv.children[0] là thẻ li chứa chữ
    todos[todoIndex] = todoDiv.children[0].innerText;

    //Lưu lại vào kho
    localStorage.setItem('todos', JSON.stringify(todos));
}   