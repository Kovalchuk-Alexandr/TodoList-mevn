"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO = exports.PORT = void 0;
// Если не установлен порт по-умолчанию, устанавливаем 3000
exports.PORT = process.env.PORT || 3000;
// строку подключения берем из mongosh
// 'mongodb://127.0.0.1:27017/itproger' подключение к БД 'itproger'
exports.MONGO = 'mongodb://127.0.0.1:27017/itproger?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';
