import { ForbiddenException, NotFoundException } from "@utils";
import { FollowDTO } from "../dto";
import { FollowRepository } from "../repository";
import { FollowService } from '@domains/follower/service';

export class FollowServiceImpl implements FollowService {
    constructor (private readonly repository: FollowRepository) {}

    async followerCreate (followerId: string, followedId: string): Promise<FollowDTO> {
        return await this.repository.create(followerId, followedId)
      }
    
    async followerDelete (followerId: string, followedId : string): Promise<void> {
        const follow = await this.repository.getFollow(followerId, followedId);
        if (follow) {
          await this.repository.delete(follow.id)
        }
    }

    async getFollow (followerId: string, followedId: string): Promise<FollowDTO> {
      const follow = await this.repository.getFollow(followerId, followedId)
      if (follow) {
        return follow
      } else {
        throw new Error('Relation not found')
      }
    }
}
