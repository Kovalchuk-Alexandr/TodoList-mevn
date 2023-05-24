"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
// Описываем поля коллекции
const TodoList = new mongoose_1.Schema({
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
});
// Говорим, что будет экспортироваться по имени 'Todo' модель
// 'todoItem' - название коллекции, TodoList - наполнение 
exports.Todo = (0, mongoose_1.model)('todoItem', TodoList);
