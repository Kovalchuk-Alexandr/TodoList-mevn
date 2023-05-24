"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
// Файл, отвечающий за URL - адреса
const express_1 = require("express");
const TodoList_1 = require("../models/TodoList");
const router = (0, express_1.Router)();
// 'POST' - сохранение
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Todo
        // в TodoList.ts из данные, которые получим из формы
        const NewTodoListItem = new TodoList_1.Todo(req.query); //Todo(req.body)
        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = yield NewTodoListItem.save();
        if (!result)
            throw new Error('Impossible to save data!');
        res.status(200).send('Ok!!!'); // Действие корректно обрабоно
    }
    catch (err) {
        console.log(err);
        res.status(500); // Сервер ответил ошибкой
    }
}));
// 'GET' обработка URL, за счет которого будем выводить все записи коллекции
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const getItems = yield TodoList_1.Todo.find().sort({ published: -1 });
        if (!getItems)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
// Обновление данных
// получаем 'id' записи
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const result = yield TodoList_1.Todo.updateOne({ "_id": req.params.id }, { $set: req.query });
        if (!result)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
// Удаление данных
// получаем 'id' записи
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const result = yield TodoList_1.Todo.deleteOne({ "_id": req.params.id });
        if (!result)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
exports.TodoRouter = router;
