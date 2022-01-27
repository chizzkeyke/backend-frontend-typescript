"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateControl = void 0;
const validator_1 = __importDefault(require("validator"));
function validateControl(obj) {
    return new Promise((resolve, reject) => {
        const errors = [];
        const { email, password, confirmPassword } = obj;
        if (!validator_1.default.isEmail(email)) {
            errors.push('Not a valid email.');
        }
        if (!validator_1.default.isLength(password, { max: 20, min: 7 })) {
            errors.push('Max length password is 20, min length: 7');
        }
        if (!validator_1.default.equals(password, confirmPassword)) {
            errors.push('Password and confirm password not equal.');
        }
        if (errors.length == 0) {
            resolve('All good.');
        }
        else {
            reject(errors);
        }
    });
}
exports.validateControl = validateControl;
