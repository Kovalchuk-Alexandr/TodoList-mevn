import { Schema, model } from "mongoose";

// Описываем поля коллекции
const TodoList = new Schema({
    title: {
        type: String,
        required: true
        // default: 'asdfg' - можно добавить любое значение по-умолчанию
    },
    user: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        require: false,
        default: Date.now()
    }
})

// Говорим, что будет экспортироваться по имени 'Todo' модель
// 'todoItem' - название коллекции, TodoList - наполнение 
export const Todo = model('todoItem', TodoList)