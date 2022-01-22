"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const postTag_1 = require("./postTag");
const userId_1 = require("./userId");
const description_1 = require("./description");
const like_1 = require("./like");
const dislike_1 = require("./dislike");
class Post extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get postTag() {
        return this.props.postTag;
    }
    set postTag(value) {
        this.props.postTag = value;
    }
    get userId() {
        return this.props.userId;
    }
    set userId(value) {
        this.props.userId = value;
    }
    get like() {
        return this.props.like;
    }
    set like(value) {
        this.props.like = value;
    }
    set dislike(value) {
        this.props.dislike = value;
    }
    get dislike() {
        return this.props.dislike;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(postDTO, id) {
        const description = postDTO.description;
        const postTag = postDTO.postTag;
        const userId = postDTO.userId;
        const like = postDTO.like;
        const dislike = postDTO.dislike;
        if (!!description === false || description.length === 0) {
            return Result_1.Result.fail('Must provide a description');
        }
        else {
            const post = new Post({ description: description_1.Description.create({ value: description }).getValue(),
                postTag: postTag_1.PostTag.create({ value: postTag }).getValue(),
                userId: userId_1.UserId.create(userId).getValue(),
                like: like_1.Like.create({ like: like }).getValue(),
                dislike: dislike_1.Dislike.create({ dislike: dislike }).getValue() }, id);
            return Result_1.Result.ok(post);
        }
    }
}
exports.Post = Post;
//# sourceMappingURL=post.js.map