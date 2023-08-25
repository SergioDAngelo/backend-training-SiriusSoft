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
