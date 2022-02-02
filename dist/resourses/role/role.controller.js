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
const role_model_1 = require("./role.model");
class RoleController {
    setRoleToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield role_model_1.modelRole.create({ value: 'USER' });
            const admin = yield role_model_1.modelRole.create({ value: 'ADMIN' });
            yield user.save();
            yield admin.save();
        });
    }
}
exports.default = new RoleController();
