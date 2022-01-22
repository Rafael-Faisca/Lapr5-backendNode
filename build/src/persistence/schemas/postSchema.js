"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Post = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        index: true,
    },
    postTag: {
        type: String,
        index: true,
    },
    userId: String,
    like: [String],
    dislike: [String],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Post', Post);
//# sourceMappingURL=postSchema.js.map