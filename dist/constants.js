"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG_OPTIONS = void 0;
exports.DB_CONFIG_OPTIONS = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
