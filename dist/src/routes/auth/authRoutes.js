"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validator_1 = require("./auth-validator");
const logout_handler_1 = require("./logout-handler");
const router = express_1.default.Router();
router.get('/', auth_validator_1.authHandler);
router.get('/logout', logout_handler_1.logoutHandler);
const authRoutes = router;
exports.authRoutes = authRoutes;
