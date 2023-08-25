import { FollowDTO } from "../dto"

export interface FollowService {
  followerCreate: (followerId: string, followedId: string) => Promise<FollowDTO>
  followerDelete: (followerId: string, followedId: string) => Promise<void>
  getFollow: (followerId: string, followedId: string) => Promise<FollowDTO>
}

