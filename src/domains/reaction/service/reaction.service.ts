import { ReactionDTO } from "../dto";

export interface reactionService {
    createReaction: (postId: string, userId: string, retweet: boolean, like: boolean) => Promise<ReactionDTO>
    getReaction: (postId: string, userId: string) => Promise<ReactionDTO[]>
    getAllReactions: (postId: string, userId: string) => Promise<ReactionDTO[]>
    getCount: (postId: string) => Promise<number>
    getCountReaction: (postId: string) => Promise<number>
    deleteReaction(postId: string, userId: string): Promise<void>
}
  