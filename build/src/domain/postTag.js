"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTag = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
class PostTag extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    set value(value) {
        this.props.value = value;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        return Result_1.Result.ok(new PostTag({
            value: props.value
        }));
    }
}
exports.PostTag = PostTag;
//# sourceMappingURL=postTag.js.map