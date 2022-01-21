import IPostDTO from "../../../src/dto/IPostDTO";
import * as sinon from 'sinon';
import ICreatePostDTO from "../../../src/dto/ICreatePostDTO";
import {Post} from "../../../src/domain/post";
import {Result} from "../../../src/core/logic/Result";
import IPostRepo from "../../../src/services/IRepos/IPostRepo";
import {Container} from "typedi";
import PostService from "../../../src/services/postService";
import 'reflect-metadata';


describe('Post service create', () => {

  let post: ICreatePostDTO = ({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: [],
  })

  let post1: Result<Post> = Post.create({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: []
  })

  let res = Result.ok<IPostDTO>({
    id : "1",
    description: "ola",
    postTag: "boxe",
    userId: "12",
    like: [],
    dislike: []
  })


  let postSchemaInstance = require("../../../src/persistence/schemas/postSchema").default;
  Container.set("postSchema", postSchemaInstance);

  let postRepoClass = require("../../../src/repos/postRepo").default;
  let postRepoInstance = Container.get(postRepoClass);
  Container.set("PostRepo", postRepoInstance);

  sinon.stub(postRepoInstance, "save").returns(post1.getValue())

  beforeEach(() => {
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should create post ', async function (done) {
    const service = new PostService(postRepoInstance as IPostRepo);
    const postResult = await service.createPost(post);
    Promise.resolve(res).then(function (value) {
      sinon.assert.match(postResult.getValue().postTag ,value.getValue().postTag);
      sinon.assert.match(postResult.getValue().description ,value.getValue().description);
      sinon.assert.match(postResult.getValue().userId ,value.getValue().userId);
      sinon.assert.match(postResult.getValue().like ,value.getValue().like);
      sinon.assert.match(postResult.getValue().dislike ,value.getValue().dislike);
    });
    done();
  })

  it('should get post ', async function (done) {
    const service = new PostService(postRepoInstance as IPostRepo);
    const postResult =  service.getPosts(post.userId);
    // Promise.resolve(postList).then(function (value){
    //   sinon.assert.match(postResult[0].getValue().postTag,value[0].getValue().postTag);
    //   sinon.assert.match(postResult[0].getValue().description,value[0].getValue().description);
    //   sinon.assert.match(postResult[0].getValue().userId,value[0].getValue().userId);
    //   sinon.assert.match(postResult[0].getValue().like,value[0].getValue().like);
    //   sinon.assert.match(postResult[0].getValue().dislike,value[0].getValue().dislike);
    // });
    done();
  })
  })
