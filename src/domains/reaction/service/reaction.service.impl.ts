import { ReactionDTO } from "../dto";
import { reactionRepository } from "../repository";
import { reactionService } from "./reaction.service";
import { UserRepository } from "../../user/repository"
import { PostRepository } from "@domains/post/repository";

export class reactionServiceImpl implements reactionService {
    constructor (
        private readonly repository: reactionRepository,
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository
    ) {}

    async createReaction (postId: string, userId: string, retweet: boolean, like: boolean): Promise<ReactionDTO> {
        return await this.repository.reactionPost(postId, userId, retweet, like)
    }

    async getReaction (postId: string, userId: string): Promise<ReactionDTO[]> {
        const reaction = await this.repository.getReactionById(postId, userId)
        if (reaction) {
            return reaction
        } else {
            throw new Error('Reaction not found')
        }
    }

    async getAllReactions (postId: string): Promise<ReactionDTO[]> {
        const post = await this.postRepository.getById(postId)

        if (post) {
            const reactions = await this.repository.getAllReactions(postId)
            if (reactions) {
                return reactions
            } else {
                throw new Error('No new reactions found for this post')
            }
        } else {
            throw new Error('Post not found')
        }
    }

    async getCount (postId: string): Promise<number> {
        const post = await this.postRepository.getById(postId)
        const count = await this.repository.getCount(postId)
        if (post && count) {
            return count
        } else {
            throw new Error('Either post does not exist or has not been reacted yet. Try later')
        }
    }

    async getCountReaction (postId: string): Promise<number> {
        const post = await this.postRepository.getById(postId)
        const reactions = await this.repository.getAllReactions(postId)
        let count = 0

        if (post && reactions.length > 0) {
            for (let reaction of reactions) {
                if (reaction.like == true) {
                    count += 1
                }
                if (reaction.retweet == true) {
                    count += 1
                }
            }
            return count
        } else {
            throw new Error('Either post does not exist or has not been reacted yet. Try later')
        }
    }

    async deleteReaction(postId: string, userId: string): Promise<void> {
        const reaction = await this.repository.getReactionById(postId, userId)
        if (reaction) {
            await this.repository.deleteReaction(postId, userId)
        } else {
            throw new Error('Reaction not found. Method could not be performed (delete)')
        }
    }
}
