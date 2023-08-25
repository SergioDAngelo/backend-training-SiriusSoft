import { FollowDTO } from "../dto"

export interface FollowRepository {
    create: (followerId: string, followedId: string) => Promise<FollowDTO>
    getFollow: (followerId: string, followedId: string) => Promise<FollowDTO|null> 
    delete: (id: string) => Promise<void>
    getFollowing: (userId: any, authorId: string) => Promise<boolean>
}
