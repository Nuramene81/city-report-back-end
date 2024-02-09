"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const add_user_handler_1 = require("./add-user/add-user-handler");
const get_current_user_1 = require("./get-current-user.ts/get-current-user");
const router = express_1.default.Router();
router.post('/', add_user_handler_1.addUserHandler);
router.get('/', get_current_user_1.getCurrentUserHandler);
const userRoutes = router;
exports.userRoutes = userRoutes;
