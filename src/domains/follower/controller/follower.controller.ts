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

    const follow: FollowDTO = await service.createFollow(followerId, followedId)
    res.json({ message: 'User followed successfully', follow });
})

// POST /api/follower/unfollow/:user_id
followRouter.post('/unfollow/:user_id', async (req: Request, res: Response) => {
    const followerId = req.params.user_id
    const { userId: followedId } = res.locals.context

    await service.deleteFollow(followerId, followedId)
    res.json({ message: 'User unfollowed successfully' });
})

// GET /api/:user_id
followRouter.get('/:user_id', async (req: Request, res: Response) =>{
    const followerId = req.params.user_id
    const {userId: followedId} = res.locals.context
    
    await service.getFollow(followerId, followedId)
    res.json({ message: 'Following'});
})

// import { Request, Response, Router } from 'express'
// import HttpStatus from 'http-status'
// import 'express-async-errors'

// import { db, BodyValidation } from '@utils'

// import { FollowerRepositoryImpl } from '../repository'
// import { FollowerService, FollowerServiceImpl } from '../service'
// import { FollowUserDTO } from '../dto'

// export const followerRouter = Router()

// // Use dependency injection
// const service: FollowerService = new FollowerServiceImpl(new FollowerRepositoryImpl(db))


// followerRouter.post('/follow/:user_id', async (req: Request, res: Response) => {
//     const { user_id:followedId } = req.params;
//     const { userId:followerId } = res.locals.context

//     const following = 
//     await service.followUser(followerId, followedId);
//     return res.status(HttpStatus.CREATED).json({ message: "User followed successfully.", following });})

// followerRouter.delete('/unfollow/:user_id', async (req: Request, res: Response) => {
//     const { user_id: followedId } = req.params;
//     const { userId: followerId } = res.locals.context

//     const unfollowed = 
    
//     await service.unfollowUser(followerId, followedId);
//     return res.status(HttpStatus.OK).json({ message: "User unfollowed successfully.", unfollowed });})

//     // try {
//     //     const following = 
//     //     await service.followUser(followerId, followedId);
//     //     return res.status(HttpStatus.CREATED).json({ message: "User followed successfully.", following });
//     //   } catch (error) {
//     //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to follow user." });
//     //   }

