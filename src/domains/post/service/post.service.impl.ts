import { CreatePostInputDTO, PostDTO } from '../dto'
import { PostRepository } from '../repository'
import { PostService } from '.'
import { validate } from 'class-validator'
import { ForbiddenException, NotFoundException, UnauthorizedAccessException } from '@utils/errors'
import { CursorPagination } from '@types'
import { UserRepository } from '@domains/user/repository'
import { FollowRepository } from '@domains/follower/repository'
import { FollowService } from '@domains/follower/service'

export class PostServiceImpl implements PostService {
  constructor (
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository
      ) {}

  async createPost (userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    await validate(data)
    return await this.postRepository.create(userId, data)
  }

  async deletePost (userId: string, postId: string): Promise<void> {
    const post = await this.postRepository.getById(postId)
    if (!post) throw new NotFoundException('post')
    if (post.authorId !== userId) throw new ForbiddenException()
    await this.postRepository.delete(postId)
  }

  async getPost (userId: string, postId: string): Promise<PostDTO> {
    // TODO: validate that the author has public profile or the user follows the author
    const post = await this.postRepository.getById(postId)
    
    if (post) {
      const author = await this.userRepository.getById(post.authorId)
      //const authorIsFollowed = await this.followRepository.getFollow(userId,post.authorId)
      const authorIsFollowed = await this.followRepository.getFollow(post.authorId, userId);
      if (author?.isPrivate == false) {
        return post
      } else if (
        (author?.isPrivate == true && (authorIsFollowed))
        || (author?.isPrivate == true && author?.id == userId)
        ) {
        return post
      } else {
        throw new UnauthorizedAccessException('This author has a private profile')  
      }
    } else {
      throw new NotFoundException('Post not found')
    } 
    
  }

  async getComments(postId: string, userId: string): Promise<PostDTO[]> {
    const post = await this.postRepository.getById(postId)
    if (post) {
      const comments = await this.postRepository.getComments(postId)
      var thread = []
      for (let comment of comments) {
        const author = await this.userRepository.getById(comment.authorId)
        const authorIsFollowed = await this.followRepository.getFollow(comment.authorId, userId)
        if (author?.isPrivate == false) {
          thread.push(comment)
        } 
        if (author?.isPrivate == true && authorIsFollowed) {
          thread.push(comment)
        }
        if (author?.isPrivate == true && author?.id == userId) {
          thread.push(comment)
        }
      }
      return thread
    } else {
      throw new NotFoundException('Post not found')
    }
  }

  async getLatestPosts (userId: any, options: CursorPagination): Promise<PostDTO[]> {
    // TODO: filter post search to return posts from authors that the user follows

    const posts = await this.postRepository.getAllByDatePaginated(options)
    console.log(posts.length)

    var latestPosts = []

    for (let post of posts) {
      const author = await this.userRepository.getById(post.authorId)
      const authorIsFollowed = await this.followRepository.getFollow(post.authorId, userId)

      if (author?.isPrivate == false) {
        latestPosts.push(post)
      } 
      
      if (author?.isPrivate == true && authorIsFollowed) {
        latestPosts.push(post)
      }

      if (author?.isPrivate == true && author?.id == userId) {
        latestPosts.push(post)
      }

    }
    
    return latestPosts

  }

  async getPostsByAuthor (userId: any, authorId: string, options: { limit?: number, before?: string, after?: string }): Promise<PostDTO[] | undefined> {
    // TODO: throw exception when the author has a private profile and the user doesn't follow them
    
    const author = await this.userRepository.getById(authorId)
    const posts = await this.postRepository.getByAuthorId(authorId, options)

    const authorIsFollowed = await this.followRepository.getFollow(authorId, userId)
    console.log('Relation founded: ', authorIsFollowed)

    if (author) {
      if (author?.isPrivate == false) {
        return posts
      } else if (
        (author?.isPrivate == true && authorIsFollowed)
        || (author?.isPrivate == true && author?.id == userId)
        ) {
        return posts
      } else {
        throw new UnauthorizedAccessException('This author has a private profile')
      }
    } else {
      throw new NotFoundException('Author not found')
    }

  }

  async getLikedPosts (userId: string): Promise<PostDTO[]> {
    const author = await this.userRepository.getById(userId)
    const likedPosts = await this.postRepository.getLikedPosts(userId)
    if (author) {
      if (likedPosts.length > 0) {
        return likedPosts
      } else {
        throw new Error('Author have not given a like to any posts yet. Try later')
      }
    } else {
      throw new Error('Author not found')
    }
  }

  async getRetweetedPosts (userId: string): Promise<PostDTO[]> {
    const author = await this.userRepository.getById(userId)
    const retweetedPosts = await this.postRepository.getRetweetedPosts(userId)
    if (author) {
      if (retweetedPosts.length > 0) {
        return retweetedPosts
      } else {
        throw new Error('Author have not given a retweet to any posts yet. Try later')
      } 
    } else {
      throw new Error('Author not found')
    }
  }

  async getReplies (authorId: string, userId: string): Promise<PostDTO[]> {
    const author = await this.userRepository.getById(authorId)
    const replies = await this.postRepository.getReplies(authorId)
    var repliesAuthor = []
    if (author) {
      if (replies.length > 0) {
        for (let reply of replies) {
          if (reply.isAComment == true) {
            repliesAuthor.push(reply)
          }
        }
        return repliesAuthor
      } else {
        throw new Error('Author has not yet replied to any post. Try later')
      }
    } else {
      throw new Error('Author not found')
    }
  }
}


// import { CreatePostInputDTO, PostDTO } from '../dto'
// import { PostRepository } from '../repository'
// import { PostService } from '.'
// import { validate } from 'class-validator'
// import { ForbiddenException, NotFoundException } from '@utils'
// import { CursorPagination } from '@types'
// import { UserRepository } from '@domains/user/repository'

// export class PostServiceImpl implements PostService {
//   constructor (private readonly repository: PostRepository,
//       private readonly userRepository: UserRepository
//     ) {}

//   async createPost (userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
//     await validate(data)
//     return await this.repository.create(userId, data)
//   }

//   async deletePost (userId: string, postId: string): Promise<void> {
//     const post = await this.repository.getById(postId)
//     if (!post) throw new NotFoundException('post')
//     if (post.authorId !== userId) throw new ForbiddenException()
//     await this.repository.delete(postId)
//   }

//   async getPost (userId: string, postId: string): Promise<PostDTO> {
//     // TODO: validate that the author has public profile or the user follows the author
//     const post = await this.repository.getById(postId)
//     if (!post) throw new NotFoundException('post')
//     return post
//   }

//   async getLatestPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
//     const user = await this.userRepository.getById(userId);
//     if (!user) {
//       throw new NotFoundException('user');
//     }

//     let posts: PostDTO[];

//     if (user.isPrivate) {
//       // If the user's profile is private, fetch posts only from users the logged-in user follows
//       const followedUserIds = user.follows.map(follow => follow.followedId);
//       posts = await this.repository.getPostsByUserIds(followedUserIds, options);
//     } else {
//       // If the user's profile is public, fetch all posts (public and from followed users)
//       posts = await this.repository.getAllByDatePaginated(options);
//     }

//     return posts;
//   }

//   async getPostsByAuthor (userId: any, authorId: string): Promise<PostDTO[]> {
//     // TODO: throw exception when the author has a private profile and the user doesn't follow them
//     return await this.repository.getByAuthorId(authorId)
//   }
// }

//   // async getPost (userId: string, postId: string): Promise<PostDTO> {
//   //   // TODO: validate that the author has public profile or the user follows the author
//   //   const post = await this.repository.getById(postId)
//   //   const author = post?.authorId
//   //   const userAuthor = await this.userRepository.getById(author)  

//   //   if (post){
//   //     if (userAuthor?.isPrivate == false){
//   //         return post
//   //     } else if (userAuthor?.isPrivate == true && author == userId ||  ){
//   //         return post 
//   //     }
//   //   }

//   //   // if (!post) throw new NotFoundException('post')
//   //   // return post
//   // }
