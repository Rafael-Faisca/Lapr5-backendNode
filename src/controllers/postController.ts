import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPostController from "./IControllers/IPostController";
import IPostService from "../services/IServices/IPostService";
import IPostDTO from "../dto/IPostDTO";
import ICreatePostDTO from "../dto/ICreatePostDTO";

@Service()
export default class PostController implements IPostController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.post.name) private postServiceInstance : IPostService
  ) {}

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = await this.postServiceInstance.createPost(req.body as ICreatePostDTO) as Result<IPostDTO>;
      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postDTO = postOrError.getValue();
      return res.json( postDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const feedPosts = await this.postServiceInstance.getPosts(req.params.userId as string);

      if (feedPosts.isFailure) {
        return res.status(402).send();
      }

      const postDTO = feedPosts.getValue();
      return res.json( postDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async giveLike(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = await this.postServiceInstance.giveLikePost(req.params.id as string,req.params.userFrontend as string) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(404).send();
      }

      const postDTO = postOrError.getValue();
      return res.status(201).json( postDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async giveDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = await this.postServiceInstance.giveDisikePost(req.params.id as string,req.params.userFrontend as string) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(404).send();
      }

      const postDTO = postOrError.getValue();
      return res.status(201).json( postDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}
