import { FollowDTO } from "../dto"

export interface FollowService {
  followerCreate: (followerId: string, followedId: string) => Promise<FollowDTO>
  followerDelete: (followerId: string, followedId: string) => Promise<void>
  getFollow: (followerId: string, followedId: string) => Promise<FollowDTO>
}

// import { FollowUserDTO } from '../dto';
// import { UserDTO } from '@domains/user/dto'

// export interface FollowerService {
//   followUser(followerId: string, followedId: string): Promise<FollowUserDTO>;
//   unfollowUser(followerId: string, followedId: string): Promise<void>;
//   getUser: (userId: any) => Promise<UserDTO>
// }

