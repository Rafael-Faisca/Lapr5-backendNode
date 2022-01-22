"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class UserId extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(id) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(id, 'id');
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new UserId({ value: id }));
        }
    }
}
exports.UserId = UserId;
//# sourceMappingURL=userId.js.map