import { TodoInterface } from "../interfaces/TodoInterface.js";


//class for todo item that implements interface
export class TodoList {
    constructor(private container: HTMLUListElement){}

    addTodoItem(todo: TodoInterface, input:HTMLInputElement, btnAdd: HTMLButtonElement) {
        //create elements for todo
        const item = document.createElement('li') ;
        const label = document.createElement('label');
        const div = document.createElement('div')
        const btnDel = document.createElement('button');
        const btnEdit = document.createElement('button');
        btnDel.textContent = 'delete';
        btnEdit.textContent = 'edit';
        btnDel.classList.add('btnDelTodo');
        btnEdit.classList.add('btnEditTodo');

        //add elements to todo list
        label.append(todo.description);
        div.append(btnEdit, btnDel)
        item.append(label, div);
        this.container.prepend(item);

        //add event listener to delete button
        this.removeTodoItem(btnDel, item, input, btnAdd);    

        //add event listener to edit button
        this.editTodoItem(btnEdit, div, label, todo, input, btnAdd);

        // //clear input
        input.value = '';
    }

    removeTodoItem(btn: HTMLButtonElement, item: HTMLLIElement, input: HTMLInputElement, btnAdd: HTMLButtonElement){
        btn.addEventListener('click', () => {
            item.remove();
    
            //show Add button in case item is deleted in edit mode
            if (btnAdd.style.display === "none") {
                btnAdd.style.display = "inline-block";
                input.value = "";
            }

            btnAdd.classList.add("btn-disabled");
        })
    }

    editTodoItem(btnEdit: HTMLButtonElement, item:HTMLDivElement, label: HTMLLabelElement, todo: TodoInterface, input: HTMLInputElement, btnAdd: HTMLButtonElement) {
        btnEdit.addEventListener('click', () => {
            //create save button
            const btnSave = document.createElement("button");
            btnSave.textContent = 'save';
            btnSave.classList.add('btnSaveTodo');
    
            //add event listener to save button
            this.saveTodoItem(btnEdit, btnSave, label, todo, input, btnAdd);
    
            item.append(btnSave);
    
            //set input equal to item to edit
            input.value = todo.description;
    
            input.focus();
    
            //hide Add and Edit button
            btnAdd.style.display = "none";
            btnEdit.style.display= "none";
        })
        
    }

    saveTodoItem(btnEdit: HTMLButtonElement, btnSave: HTMLButtonElement, label: HTMLLabelElement, todo: TodoInterface, input: HTMLInputElement, btnAdd: HTMLButtonElement){
        btnSave.addEventListener('click', () =>{
            console.log(label.textContent)
    
            //update todo description and set label text to new description
            todo.description = input.value;
            label.textContent = todo.description;
    
            //remove save button and display edit & add buttons
            btnSave.remove();
            btnEdit.style.display="inline-block";
            btnAdd.style.display = "inline-block";
            btnAdd.classList.add("btn-disabled");
    
            //clear input
            input.value = "";
        })
    }
}