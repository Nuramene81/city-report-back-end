"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const express_session_1 = __importDefault(require("express-session"));
const db_pool_1 = require("./db-pool");
const userRoutes_1 = require("./src/routes/user/userRoutes");
const loginRoutes_1 = require("./src/routes/login/loginRoutes");
const authRoutes_1 = require("./src/routes/auth/authRoutes");
const issueRoutes_1 = require("./src/routes/issue/issueRoutes");
const constants_1 = require("./constants");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const pgStore = (0, connect_pg_simple_1.default)(express_session_1.default);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
const pool = new db_pool_1.Pool();
pool.testPrimaryDBConection();
pool.connect(constants_1.DB_CONFIG_OPTIONS);
app.use((0, express_session_1.default)({
    store: new pgStore({
        pool: pool._pool,
        createTableIfMissing: true,
        tableName: 'user_sessions'
    }),
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.authRoutes);
app.use('/login', loginRoutes_1.loginRoutes);
app.use('/user', userRoutes_1.userRoutes);
app.use('/issue', issueRoutes_1.issueRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
