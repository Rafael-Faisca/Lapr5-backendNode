"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostId = void 0;
const Entity_1 = require("../core/domain/Entity");
class PostId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    constructor(id) {
        super(null, id);
    }
}
exports.PostId = PostId;
//# sourceMappingURL=postId.js.map