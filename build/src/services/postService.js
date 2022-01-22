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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const Result_1 = require("../core/logic/Result");
const post_1 = require("../domain/post");
const PostMap_1 = require("../mappers/PostMap");
let PostService = class PostService {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async createPost(postDTO) {
        try {
            const postOrError = await post_1.Post.create(postDTO);
            if (postOrError.isFailure) {
                return Result_1.Result.fail(postOrError.errorValue());
            }
            const postResult = postOrError.getValue();
            await this.postRepo.save(postResult);
            const postDTOResult = PostMap_1.PostMap.toDTO(postResult);
            return Result_1.Result.ok(postDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getPosts(userId) {
        try {
            let getPosts = await this.postRepo.findByUserId(userId);
            if (getPosts == null) {
                return Result_1.Result.fail("No posts from this user");
            }
            const postDTOResult = [];
            for (let i = 0; i < getPosts.length; i++) {
                postDTOResult.push(PostMap_1.PostMap.toDTO(getPosts[i]));
            }
            return Result_1.Result.ok(postDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async giveLikePost(postId, userFrontend) {
        try {
            let getPost = await this.postRepo.findByDomainId(postId);
            if (getPost == null) {
                return Result_1.Result.fail("No post provided");
            }
            else {
                if (!getPost.like.like.length) {
                    getPost.like.like.push(userFrontend);
                }
                else {
                    if (getPost.like.like.includes(userFrontend)) {
                        return Result_1.Result.fail("Cannot like a post twice");
                    }
                    else {
                        getPost.like.like.push(userFrontend);
                    }
                }
                if (getPost.dislike.dislike.includes(userFrontend)) {
                    for (let j = 0; j < getPost.dislike.dislike.length; j++) {
                        if (getPost.dislike.dislike[j] == userFrontend) {
                            getPost.dislike.dislike.splice(j, 1);
                        }
                    }
                }
                await this.postRepo.save(getPost);
                const postDTOResult = PostMap_1.PostMap.toDTO(getPost);
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async giveDisikePost(postId, userFrontend) {
        try {
            let getPost = await this.postRepo.findByDomainId(postId);
            if (getPost == null) {
                return Result_1.Result.fail("No post provided");
            }
            else {
                if (!getPost.dislike.dislike.length) {
                    getPost.dislike.dislike.push(userFrontend);
                }
                else {
                    if (getPost.dislike.dislike.includes(userFrontend)) {
                        return Result_1.Result.fail("Cannot like a post twice");
                    }
                    else {
                        getPost.dislike.dislike.push(userFrontend);
                    }
                }
                if (getPost.like.like.includes(userFrontend)) {
                    for (let j = 0; j < getPost.like.like.length; j++) {
                        if (getPost.like.like[j] == userFrontend) {
                            getPost.like.like.splice(j, 1);
                        }
                    }
                }
                await this.postRepo.save(getPost);
                const postDTOResult = PostMap_1.PostMap.toDTO(getPost);
                return Result_1.Result.ok(postDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
PostService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.post.name)),
    __metadata("design:paramtypes", [Object])
], PostService);
exports.default = PostService;
//# sourceMappingURL=postService.js.map