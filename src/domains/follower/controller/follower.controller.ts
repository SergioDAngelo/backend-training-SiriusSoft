import { Request, Response, Router } from "express";

import { db } from '@utils'

import { FollowRepositoryImpl } from '../repository'
import { FollowService, FollowServiceImpl } from '../service'
import { FollowDTO } from "../dto";

export const followRouter = Router();

const service: FollowService = new FollowServiceImpl(new FollowRepositoryImpl(db))

// POST /api/follower/follow/:user_id 
followRouter.post('/follow/:user_id', async (req: Request, res: Response) => {
    const followerId = req.params.user_id
    const { userId: followedId } = res.locals.context 

    const follow: FollowDTO = await service.followerCreate(followerId, followedId)
    res.json({ message: 'User followed successfully', follow });
})

// POST /api/follower/unfollow/:user_id
followRouter.post('/unfollow/:user_id', async (req: Request, res: Response) => {
    const followerId = req.params.user_id
    const { userId: followedId } = res.locals.context

    await service.followerDelete(followerId, followedId)
    res.json({ message: 'User unfollowed successfully' });
})

// GET /api/:user_id
followRouter.get('/:user_id', async (req: Request, res: Response) =>{
    const followerId = req.params.user_id
    const {userId: followedId} = res.locals.context
    
    await service.getFollow(followerId, followedId)
    res.json({ message: 'Following'});
})
