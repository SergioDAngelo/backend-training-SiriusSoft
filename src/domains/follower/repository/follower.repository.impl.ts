import { PrismaClient } from "@prisma/client";
import { FollowRepository } from '@domains/follower/repository';
import { FollowDTO } from "../dto";

export class FollowRepositoryImpl implements FollowRepository {
    constructor (private readonly db: PrismaClient) {}

    async create (followerId: string, followedId: string): Promise<FollowDTO> {
        return await this.db.follow.create({
            data: {
                followed: {
                    connect: {
                        id: followedId,
                    }
                },
                follower: {
                    connect: {
                        id: followerId,
                    },
                },
            },
        })
    }

    async getFollow (followerId: string, followedId: string): Promise<FollowDTO|null> {
        return await this.db.follow.findFirst({
            where: {
                    followerId,
                    followedId
            },
        })
    } 

    async delete (id: string): Promise<void> {
        await this.db.follow.deleteMany({
            where: {
                id,
            }
        })
    }

    async getFollowing (followerId: string, followedId: string): Promise<boolean> {
        console.log(followerId, ": userId", followedId, ": AuthorId")
        
        const following = await this.db.follow.findMany({
            where: {
                    followerId,
                    followedId
            },
        })

        console.log(following, "Respository following")
        
        return following  ? true : false;
    }
}



// // En el archivo follower.repository.impl.ts
// import { PrismaClient, Follow } from '@prisma/client';
// import { FollowerRepository } from './follower.repository';
// import { FollowUserDTO } from '../dto';

// export class FollowerRepositoryImpl implements FollowerRepository {
//   private readonly prisma: PrismaClient;

//   constructor(prisma: PrismaClient) {
//     this.prisma = prisma;
//   }

//   async isFollowing(followerId: string, followedId: string): Promise<boolean> {
//     const follow = await this.prisma.follow.findMany({
//       where: {       
//           followerId: followerId,
//           followedId: followedId,
//         },
//       },
//     );
//     return !!follow;
//   }

//   async followUser(followerId: string, followedId: string): Promise<FollowUserDTO> {
//     return await this.prisma.follow.create({
//       data: {
//         followerId,
//         followedId,
//       },
//     });
//   }

//   async unfollowUser(followerId: string, followedId: string): Promise<void> {
//     await this.prisma.follow.deleteMany({
//       where: {
//           followerId: followerId,
//           followedId: followedId,
//       },
//     });
//   }
// }