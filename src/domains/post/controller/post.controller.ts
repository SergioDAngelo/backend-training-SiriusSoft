import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import 'express-async-errors'

import { db, BodyValidation } from '@utils'

import { PostRepositoryImpl } from '../repository'
import { PostService, PostServiceImpl } from '../service'
import { CreatePostInputDTO } from '../dto'
import { UserRepositoryImpl } from '@domains/user/repository'
import { FollowRepositoryImpl } from '@domains/follower/repository'

export const postRouter = Router()

// Use dependency injection
const service: PostService = new PostServiceImpl(
  new PostRepositoryImpl(db), 
  new UserRepositoryImpl(db), 
  new FollowRepositoryImpl(db)
)

postRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { limit, before, after } = req.query as Record<string, string>

  const posts = await service.getLatestPosts(userId, { limit: Number(limit), before, after })

  return res.status(HttpStatus.OK).json(posts)
})

postRouter.get('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params

  const post = await service.getPost(userId, postId)
  const comments = await service.getComments(postId, userId)

  return res.status(HttpStatus.OK).json({post, comments})
})

postRouter.get('/by_user/:authorId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { authorId } = req.params
  const { limit, before, after } = req.query as Record<string, string>

  const posts = await service.getPostsByAuthor(userId, authorId, { limit: Number(limit), before, after })

  return res.status(HttpStatus.OK).json(posts)
})

postRouter.get('/thread/:postId', async (req: Request, res: Response) => {
  const { postId } = req.params
  const { userId } = res.locals.context
  const comments = await service.getComments(postId, userId)
  return res.status(HttpStatus.OK).json(comments)
})

postRouter.get('/by_user/:authorId/replies', async (req: Request, res: Response) => {
  const { authorId } = req.params
  const { userId } = res.locals.context
  const replies = await service.getReplies(authorId, userId)
  return res.status(HttpStatus.OK).json(replies)
})

postRouter.get('/by_user/:authorId/liked', async (req: Request, res: Response) => {
  const { authorId } = req.params
  const likedPosts = await service.getPostsLikes(authorId)
  return res.status(HttpStatus.OK).json(likedPosts)
})

postRouter.get('/by_user/:authorId/retweeted', async (req: Request, res: Response) => {
  const { authorId } = req.params
  const retweetedPosts = await service.getPostsRetweet(authorId)
  return res.status(HttpStatus.OK).json(retweetedPosts)
})

postRouter.post('/', BodyValidation(CreatePostInputDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const data = req.body

  const post = await service.createPost(userId, data)

  return res.status(HttpStatus.CREATED).json(post)
})

postRouter.delete('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params

  await service.deletePost(userId, postId)

  return res.status(HttpStatus.OK).send(`Deleted post ${postId}`)
})