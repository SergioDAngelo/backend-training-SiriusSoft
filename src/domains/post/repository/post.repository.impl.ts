import { PrismaClient } from '@prisma/client'

import { CursorPagination } from '@types'

import { PostRepository } from '.'
import { CreatePostInputDTO, PostDTO } from '../dto'

export class PostRepositoryImpl implements PostRepository {
  constructor (private readonly db: PrismaClient) {}

  async create (userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    const post = await this.db.post.create({
      data: {
        authorId: userId,
        ...data
      }
    })
    return new PostDTO(post)
  }

  async getAllByDatePaginated (options: CursorPagination): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'asc'
        }
      ]
    })
    return posts.map(post => new PostDTO(post))
  }

  async delete (postId: string): Promise<void> {
    await this.db.post.delete({
      where: {
        id: postId
      }
    })
  }

  async getById (postId: string): Promise<PostDTO | null> {
    const post = await this.db.post.findUnique({
      where: {
        id: postId
      }
    })
    return (post != null) ? new PostDTO(post) : null
  }

  async getByAuthorId (authorId: string, options: CursorPagination): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        authorId,
      },
      cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'asc'
        }
      ]
    })
    return posts.map(post => new PostDTO(post))
  }
 
  async getComments (postId: string): Promise<PostDTO[]> {
    const comments = await this.db.post.findMany({
      where: {
        threadId: postId
      },
      take: 10,
      orderBy: {
        reactions: {
          _count: 'desc',
        }
      }
    })
    return comments.map(comment => new PostDTO(comment))
  }

  async getPostsLikes (userId: string): Promise<PostDTO[]> {
    const likedPosts = await this.db.post.findMany({
      where: {
        authorId: userId,
        reactions: {
          some: {
            like: true,
          }
        }
      }
    })
    return likedPosts.map(like => new PostDTO(like))
  }

  async getPostsRetweet (userId: string): Promise<PostDTO[]> {
    const retweetedPosts = await this.db.post.findMany({
      where: {
        authorId: userId,
        reactions: {
          some: {
            retweet: true,
          }
        }
      }
    })
    return retweetedPosts.map(retweet => new PostDTO(retweet))
  }

  async getReplies (authorId: string): Promise<PostDTO[]> {
    const replies = await this.db.post.findMany({
      where: {
        authorId,
        isAComment: true,
      }
    })
    return replies.map(reply => new PostDTO(reply))
  }
}