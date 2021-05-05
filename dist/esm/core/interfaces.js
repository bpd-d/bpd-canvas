;
export class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
export class InitializationError extends ErrorBase {
    constructor(message) {
        super("InitializationError", message);
    }
}
export class MissingKeyException extends ErrorBase {
    constructor(type, message) {
        super("MissingKeyException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
export class IteratorException extends ErrorBase {
    constructor(type, message) {
        super("IteratorException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
export class ElementException extends ErrorBase {
    constructor(type, id, message) {
        super("ElementException", `[${type}][${id}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
export class SetterException extends ErrorBase {
    constructor(type, message) {
        super("SetterException", `[${type}] ${message !== null && message !== void 0 ? message : ""}`);
    }
}
export class EnumSetterException extends SetterException {
    constructor(message) {
        super("Enum", `${message !== null && message !== void 0 ? message : ""}`);
    }
}
export class MapperExecption extends ErrorBase {
    constructor(key, message) {
        super("MapperExecption", `Error occured on [${key}]: ${message}`);
    }
}
export class CounterError extends ErrorBase {
    constructor(name, message) {
        super("CounterError", `Counter [${name}]: ${message}`);
    }
}
