"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const post_1 = require("../domain/post");
class PostMap extends Mapper_1.Mapper {
    static toDTO(post) {
        return {
            id: post.id.toString(),
            description: post.description.value,
            postTag: post.postTag.value,
            userId: post.userId.value,
            like: post.like.like,
            dislike: post.dislike.dislike
        };
    }
    static toDomain(post) {
        const postOrError = post_1.Post.create(post, new UniqueEntityID_1.UniqueEntityID(post.domainId));
        postOrError.isFailure ? console.log(postOrError.error) : '';
        return postOrError.isSuccess ? postOrError.getValue() : null;
    }
    static toPersistence(post) {
        const a = {
            domainId: post.id.toString(),
            description: post.description.value,
            postTag: post.postTag.value,
            userId: post.userId.value,
            like: post.like.like,
            dislike: post.dislike.dislike
        };
        return a;
    }
}
exports.PostMap = PostMap;
//# sourceMappingURL=PostMap.js.map