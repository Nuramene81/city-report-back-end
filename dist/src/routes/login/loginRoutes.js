"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const login_validator_1 = require("./login-validator");
const router = express_1.default.Router();
router.post('/', login_validator_1.loginHandler);
const loginRoutes = router;
exports.loginRoutes = loginRoutes;
