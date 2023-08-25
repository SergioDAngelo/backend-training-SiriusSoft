import { PrismaClient } from "@prisma/client";
import { CreateReactionDTO, ReactionDTO } from "../dto";
import { reactionRepository } from "./reaction.repository";

export class reactionRepositoryImpl implements reactionRepository {
    constructor (private readonly db: PrismaClient) {}

    async reactionPost (postId: string, userId: string, retweet: boolean, like: boolean): Promise<ReactionDTO> {
        const reactions = await this.db.reaction.create({
            data: {
                postId,
                userId,
                retweet, 
                like
            }
        })
        return new ReactionDTO(reactions)
    }

    async getReactionById (postId: string, userId: string): Promise<ReactionDTO[] | null> {
        const reactions = await this.db.reaction.findMany({
            where: {
                userId,
                postId
            },
        })
        return reactions.map(reaction => new ReactionDTO(reaction))
    }

    async getAllReactions (postId: string): Promise<ReactionDTO[]> {
        const reactions = await this.db.reaction.findMany({
            where: {
                postId
            },
        })
        return reactions.map(reaction => new ReactionDTO(reaction))
    }

    async getCount (postId: string): Promise<number> {
        const reactions = await this.db.reaction.aggregate({
            where: {
                postId,
            },
            _count: {
                like: true,
                retweet: true,
            }
        })
        const count = reactions._count.like + reactions._count.retweet
        console.log('repository reaction: ', reactions)
        console.log('repository count: ', count)
        return count
    }

    async deleteReaction (postId: string, userId: string): Promise<void> {
        await this.db.reaction.deleteMany({
            where: {
                postId,
                userId
            },
        })
    }
}
