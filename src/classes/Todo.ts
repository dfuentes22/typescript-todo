import { TodoInterface } from "../interfaces/TodoInterface.js";


//class for todo item that implements interface
export class Todo implements TodoInterface {
    constructor(public description: string, public completed: boolean){}
}