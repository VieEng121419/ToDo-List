//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listener
document.addEventListener('DOMContentLoaded',getTodo);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo); 
//Functions
function addTodo(event){
   event.preventDefault();
   //Todo Div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');
   //Creat Li
   const newTodo = document.createElement('li'); 
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   //Add Todo To Localstorage
   saveLocalTodos(todoInput.value);
   //Check Mark Button
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fas fa-check"></i>';
   completedButton.classList.add("complete-btn");
   todoDiv .appendChild(completedButton);
    //Check Trash Button
    const trashdButton = document.createElement('button');
    trashdButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashdButton.classList.add("trash-btn");
    todoDiv .appendChild(trashdButton);
   //Append To List
   todoList.appendChild(todoDiv);
   //Clear Todo Input Value
   todoInput.value = "";
}

function deleteCheck(e){
   const item = e.target;
   //Delete Todo
   if(item.classList[0] === 'trash-btn'){
      const todo = item.parentElement;
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener('transitionend',function(){
         todo.remove();
      })
   }
   //Check Mark
   if(item.classList[0] === 'complete-btn'){
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

function filterTodo(e){
   const todos = todoList.childNodes;
   for (let i =1 ; i < todos.length;i++){
      let todo = todos[i];
      switch(e.target.value){
         case "all":
            console.log(todo);
            todo.style.display= "flex";
            break;
         case "completed":
            if(todo.classList.contains('completed')){
               todo.style.display = "flex";
            }else{
               todo.style.display = "none";
            }
            break;
         case "uncompleted":
            if(!todo.classList.contains('completed')){
               todo.style.display = "flex";
            }else{
               todo.style.display = "none";
            }
      }
   }
}

function saveLocalTodos(todo){
   let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   }else{
      todos =JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodo() { 
   let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   }else{
      todos =JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function(todo){
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      //Creat Li
      const newTodo = document.createElement('li'); 
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);
      //Check Mark Button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv .appendChild(completedButton);
      //Check Trash Button
      const trashdButton = document.createElement('button');
      trashdButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashdButton.classList.add("trash-btn");
      todoDiv .appendChild(trashdButton);
      //Append To List
      todoList.appendChild(todoDiv);
   })
 }

 function removeLocalTodos(todo) {
    let todos;
   if(localStorage.getItem('todos') === null){
      todos = [];
   }else{
      todos =JSON.parse(localStorage.getItem('todos'));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex),1);  
   localStorage.setItem('todos',JSON.stringify(todos));
 }