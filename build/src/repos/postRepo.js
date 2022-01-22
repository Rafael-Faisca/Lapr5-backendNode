"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const postId_1 = require("../domain/postId");
const PostMap_1 = require("../mappers/PostMap");
let PostRepo = class PostRepo {
    constructor(postSchema) {
        this.postSchema = postSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(postId) {
        const idX = postId instanceof postId_1.PostId ? postId.id.toValue() : postId;
        const query = { domainId: idX };
        const userDocument = await this.postSchema.findOne(query);
        return !!userDocument === true;
    }
    async save(post) {
        const query = { domainId: post.id.toString() };
        const postDocument = await this.postSchema.findOne(query);
        try {
            if (postDocument === null) {
                const rawPost = PostMap_1.PostMap.toPersistence(post);
                const postCreated = await this.postSchema.create(rawPost);
                return PostMap_1.PostMap.toDomain(postCreated);
            }
            else {
                postDocument.description = post.description.value;
                postDocument.postTag = post.postTag.value;
                postDocument.userId = post.userId.value;
                postDocument.like = post.like.like;
                postDocument.dislike = post.dislike.dislike;
                await postDocument.save();
                return post;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByUserId(userId) {
        const postRecord = await this.postSchema.find();
        const posts = [];
        postRecord.forEach((value) => posts.push(PostMap_1.PostMap.toDomain(value)));
        return posts.filter((post) => post.userId.value == userId);
    }
    async findByDomainId(postId) {
        const query = { domainId: postId };
        const postRecord = await this.postSchema.findOne(query);
        if (postRecord != null) {
            return PostMap_1.PostMap.toDomain(postRecord);
        }
        else
            return null;
    }
};
PostRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('postSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PostRepo);
exports.default = PostRepo;
//# sourceMappingURL=postRepo.js.map