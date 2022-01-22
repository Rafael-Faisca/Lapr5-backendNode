"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/posts', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.post.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            description: celebrate_1.Joi.string().required(),
            postTag: celebrate_1.Joi.string().required(),
            userId: celebrate_1.Joi.string().required(),
            like: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
            dislike: celebrate_1.Joi.array().items(celebrate_1.Joi.string())
        })
    }), (req, res, next) => ctrl.createPost(req, res, next));
    route.get('/getPosts/:userId', (req, res, next) => ctrl.getPosts(req, res, next));
    route.put('/giveLike/:id/:userFrontend', (req, res, next) => ctrl.giveLike(req, res, next));
    route.put('/giveDislike/:id/:userFrontend', (req, res, next) => ctrl.giveDislike(req, res, next));
};
//# sourceMappingURL=postRoute.js.map