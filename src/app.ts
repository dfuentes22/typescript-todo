import { TodoInterface } from "./interfaces/TodoInterface.js";
import { Todo } from "./classes/Todo.js";
import { TodoList } from "./classes/TodoList.js";

class App {
    private static instance: App;

    private constructor() {
        //can't be accessed
    }

    //Provide the instance
    public static getInstance() {
        if (!this.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    public Init(): void {

        // =====Variables
        const list = document.querySelector('#task-list') as HTMLUListElement;
        const form = document.querySelector('#new-task-form') as HTMLFormElement;
        const details = document.querySelector('#details') as HTMLInputElement;
        const btnAdd = document.querySelector('#btnAdd') as HTMLButtonElement;
        const todoList = new TodoList(list);

        // =====Events
        //enable button if input field not empty
        details.addEventListener("keyup", () => {
            if(!details.value || details.value.trim().length === 0){
                btnAdd.classList.add("btn-disabled");
            } else{
                btnAdd.classList.remove("btn-disabled");
            }
        })

        //prevent form from submitting on enter
        form.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        })

        //add todo event listener
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault(); 
        
            //create new todo object
            const todo: TodoInterface = new Todo(details.value, false);
            
            //if input empty do nothing
            if (!details.value || details.value.trim().length === 0) {
                return false;
            } else {
                todoList.addTodoItem(todo, details, btnAdd);
                btnAdd.classList.add("btn-disabled");
            }
        });
    }
}

const appTodo = App.getInstance();
const appTodoDos = App.getInstance();

function checkInstance() {
    if (appTodo === appTodoDos) {
        console.log('singleton works, same instance')
    } else {
        console.log('singleton failed, different instances')
    }
}

checkInstance()

appTodo.Init();

