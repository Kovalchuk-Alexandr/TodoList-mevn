// Файл, отвечающий за URL - адреса
import { Router } from "express";
import {Todo} from '../models/TodoList'

const router = Router()

// 'POST' - сохранение
router.post('/', async (req, res) => {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Todo
        // в TodoList.ts из данные, которые получим из формы
        const NewTodoListItem = new Todo(req.query)  //Todo(req.body)

        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = await NewTodoListItem.save()

        if (!result) throw new Error('Impossible to save data!')

        res.status(200).send('Ok!!!')     // Действие корректно обрабоно
    } catch (err) {
        console.log(err)
        res.status(500) // Сервер ответил ошибкой
    }
})

// 'GET' обработка URL, за счет которого будем выводить все записи коллекции
router.get('/', async (req, res) => {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const getItems = await Todo.find().sort({ published: -1 })
        if (!getItems) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(getItems)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})

// Обновление данных
// получаем 'id' записи
router.put('/:id', async (req, res) => {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const result = await Todo.updateOne({"_id": req.params.id}, {$set: req.query})
        if (!result) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})

// Удаление данных
// получаем 'id' записи
router.delete('/:id', async (req, res) => {
    try {
        //  Todo.find({"user": "admin"}) - вариант с условием вывода
        // Todo.find() - вывод всех записей
        const result = await Todo.deleteOne({"_id": req.params.id})
        if (!result) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})


export const TodoRouter = router