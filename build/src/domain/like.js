"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
class Like extends ValueObject_1.ValueObject {
    get like() {
        return this.props.like;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        return Result_1.Result.ok(new Like({
            like: props.like
        }));
    }
}
exports.Like = Like;
//# sourceMappingURL=like.js.map