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
let PostController = class PostController {
    constructor(postServiceInstance) {
        this.postServiceInstance = postServiceInstance;
    }
    async createPost(req, res, next) {
        try {
            const postOrError = await this.postServiceInstance.createPost(req.body);
            if (postOrError.isFailure) {
                return res.status(402).send();
            }
            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async getPosts(req, res, next) {
        try {
            const feedPosts = await this.postServiceInstance.getPosts(req.params.userId);
            if (feedPosts.isFailure) {
                return res.status(402).send();
            }
            const postDTO = feedPosts.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async giveLike(req, res, next) {
        try {
            const postOrError = await this.postServiceInstance.giveLikePost(req.params.id, req.params.userFrontend);
            if (postOrError.isFailure) {
                return res.status(404).send();
            }
            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async giveDislike(req, res, next) {
        try {
            const postOrError = await this.postServiceInstance.giveDisikePost(req.params.id, req.params.userFrontend);
            if (postOrError.isFailure) {
                return res.status(404).send();
            }
            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
};
PostController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.post.name)),
    __metadata("design:paramtypes", [Object])
], PostController);
exports.default = PostController;
//# sourceMappingURL=postController.js.map