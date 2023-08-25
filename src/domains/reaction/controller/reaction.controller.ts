import HttpStatus from 'http-status'
import { Request, Response, Router } from "express";
import { reactionService, reactionServiceImpl } from "../service";
import { reactionRepositoryImpl } from "../repository";
import { UserRepositoryImpl } from "../../user/repository"; 
import { db } from "@utils";
import { PostRepositoryImpl } from '@domains/post/repository';

export const reactionRouter = Router();

const service: reactionService = new reactionServiceImpl(
  new reactionRepositoryImpl(db),
  new PostRepositoryImpl(db),
  new UserRepositoryImpl(db),
  )

// LIKE & RETWEET
//----------------------------------------------------------------

// `POST api/reaction/:post_id` 
reactionRouter.post('/:post_id', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const { userId } = res.locals.context
    
  const like = req.body.like
  const retweet = req.body.retweet

  const reaction = await service.createReaction(postId, userId, like, retweet)
  return res.status(HttpStatus.CREATED).json(reaction)
})

// `GET api/reaction/:post_id`
reactionRouter.get('/:post_id', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const { userId } = res.locals.context

  const reaction = await service.getReaction(postId, userId)
  return res.status(HttpStatus.OK).json(reaction)
})

//`GET api/reaction/all/:post_id`
reactionRouter.get('/all/:post_id', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const { userId } = res.locals.context

  const reaction = await service.getAllReactions(postId, userId)
  return res.status(HttpStatus.OK).json(reaction)
})

//----------------------------------------------------
// Count either true or false retweeted and liked post
//`GET api/reaction/:post_id/count`
reactionRouter.get('/:post_id/count', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const count = await service.getCount(postId)
  return res.status(HttpStatus.OK).json(count)
})

//----------------------------------------------------
// Count only true retweeted and liked post
// `GET api/reaction/count/:post_id`
reactionRouter.get('/count/:post_id', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const count = await service.getCountReaction(postId)
  return res.status(HttpStatus.OK).json(count)
})

// `DELETE api/reaction/:post_id`
reactionRouter.delete('/:post_id', async (req: Request, res: Response) => {
  const { post_id: postId } = req.params
  const { userId } = res.locals.context
  
  // How can I delete one of them instead of both? --> using tuples?

  const retweet = req.body.retweet
  const like = req.body.like
  
  const reaction = await service.deleteReaction(postId, userId)
  res.json({ message: 'Unreacted post successfully', reaction });
})