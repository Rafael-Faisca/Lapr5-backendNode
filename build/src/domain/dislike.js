"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dislike = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
class Dislike extends ValueObject_1.ValueObject {
    get dislike() {
        return this.props.dislike;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        return Result_1.Result.ok(new Dislike({
            dislike: props.dislike
        }));
    }
}
exports.Dislike = Dislike;
//# sourceMappingURL=dislike.js.map