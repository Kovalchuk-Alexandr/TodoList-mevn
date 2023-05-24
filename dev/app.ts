import express, { Application, Request, Response } from 'express'
import { connect } from 'mongoose'
import { MONGO, PORT } from './config'
import { TodoRouter } from './router/todoitem'

try{
    connect(MONGO)
    console.log('DB Connection successed!')
} catch (err) {
    console.log(err)
}

//     , (err) => {
//     if (err) throw err
//         console.log('DB Connection successed!')
// })

// Application, Request, Response -импортируем возможность
// добавлять типы данных
const app: Application = express()

// Подключаем промежуточные обработчики
app.use(express.urlencoded({ extended: false }))
// Ссылки, которые будут начинаться '/api/todo-item' будут обрабатываться TodoRouter
app.use('/api/todo-item', TodoRouter)

// Отслеживаем главную страницу
app.get('/', (request: Request, response: Response) => {
    response.send('Hello')
})

// Запускаем сервер
app.listen(PORT, () => console.log('Server started!!!'))