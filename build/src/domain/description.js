"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
class Description extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        return Result_1.Result.ok(new Description({
            value: props.value
        }));
    }
}
exports.Description = Description;
//# sourceMappingURL=description.js.map