import IPostDTO from "../../../src/dto/IPostDTO";
import * as sinon from 'sinon';
import {Result} from "../../../src/core/logic/Result";
import {Container} from "typedi";
import PostService from "../../../src/services/postService";
import 'reflect-metadata';
import {NextFunction, Request, Response} from "express";
import PostController from "../../../src/controllers/postController";
import IPostService from "../../../src/services/IServices/IPostService";

describe('post controller', function () {
  beforeEach(function() {
  });

  it('returns json with values when createPost', async function () {
    let body = {
      "description":'desc',
      "postTag":'boxe',
      "userId":'1',
      "like":[],
      "dislike":[]
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};


    let postSchemaInstance = require("../../../src/persistence/schemas/postSchema").default;
    Container.set("postSchema", postSchemaInstance);

    let postRepoClass = require("../../../src/repos/postRepo").default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set("PostRepo", postRepoInstance);

    let postServiceClass = require("../../../src/services/postService").default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set("PostService", postServiceInstance);

    postServiceInstance = Container.get("PostService");
    sinon.stub(postServiceInstance, "createPost").returns( Result.ok<IPostDTO>( {"id":"123", "description":'desc',
      "postTag":'boxe',
      "userId":'1',
      "like":[],
      "dislike":[]} ));

    const ctrl = new PostController(postServiceInstance as IPostService);

    await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id":"123", "description":'desc',
      "postTag":'boxe',
      "userId":'1',
      "like":[],
      "dislike":[]}));
  });
});
