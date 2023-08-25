import { ReactionDTO } from "../dto";

export interface reactionRepository {
    reactionPost: (postId: string, userId: any, retweet: boolean, like: boolean) => Promise<ReactionDTO>
    getReactionById: (postId: string, userId: string) => Promise<ReactionDTO[] | null>
    getAllReactions: (postId: string) => Promise<ReactionDTO[]>
    getCount: (postId: string) => Promise<number>
    deleteReaction: (postId: string, userId: string) => Promise<void>
}
