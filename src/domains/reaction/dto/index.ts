import { IsOptional } from "class-validator"

export class CreateReactionDTO {  
    @IsOptional()
      retweet?: boolean
      like?: boolean
  }

export class ReactionDTO {
    constructor (reaction: ReactionDTO) {
        this.id = reaction.id
        this.postId = reaction.postId
        this.like = reaction.like
        this.retweet = reaction.retweet
        this.userId = reaction.userId
        this.createdAt = reaction.createdAt
    }

    id: string
    postId: string
    like: boolean
    retweet: boolean
    userId: string
    createdAt: Date
}
