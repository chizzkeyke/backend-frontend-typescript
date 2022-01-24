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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationExamination = void 0;
const validator_1 = __importDefault(require("validator"));
function validationExamination(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, confirmPassword } = obj;
        const rulesForUsername = validator_1.default.isLength(username, { min: 4, max: 15 });
        const rulesForPasswords = password === confirmPassword;
        const validEmail = validator_1.default.isEmail(email);
        if (!rulesForUsername) {
            return 'Min length is 4 and max length 15 for username.';
        }
        if (!rulesForPasswords) {
            return 'Password and confirm password must be the same.';
        }
        if (!validEmail) {
            return 'Email is not a valid';
        }
        return true;
    });
}
exports.validationExamination = validationExamination;
