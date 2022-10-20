import { Todo } from "./classes/Todo.js";
import { TodoList } from "./classes/TodoList.js";
class App {
    constructor() {
        //can't be accessed
    }
    //Provide the instance
    static getInstance() {
        if (!this.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    Init() {
        // =====Variables
        const list = document.querySelector('#task-list');
        const form = document.querySelector('#new-task-form');
        const details = document.querySelector('#details');
        const btnAdd = document.querySelector('#btnAdd');
        const todoList = new TodoList(list);
        // =====Events
        //enable button if input field not empty
        details.addEventListener("keyup", () => {
            if (!details.value || details.value.trim().length === 0) {
                btnAdd.classList.add("btn-disabled");
            }
            else {
                btnAdd.classList.remove("btn-disabled");
            }
        });
        //prevent form from submitting on enter
        form.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });
        //add todo event listener
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //create new todo object
            const todo = new Todo(details.value, false);
            //if input empty do nothing
            if (!details.value || details.value.trim().length === 0) {
                return false;
            }
            else {
                todoList.addTodoItem(todo, details, btnAdd);
                btnAdd.classList.add("btn-disabled");
            }
        });
    }
}
const appTodo = App.getInstance();
appTodo.Init();
