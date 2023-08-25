import { CreatePostInputDTO, PostDTO } from '../dto'

export interface PostService {
  createPost: (userId: string, body: CreatePostInputDTO) => Promise<PostDTO>
  deletePost: (userId: string, postId: string) => Promise<void>
  getPost: (userId: any, postId: string) => Promise<PostDTO>
  getLatestPosts: (userId: any, options: { limit?: number, before?: string, after?: string }) => Promise<PostDTO[]>
  getPostsByAuthor: (userId: any, authorId: string, options: { limit?: number, before?: string, after?: string }) => Promise<PostDTO[] | undefined>
  
  getComments: (postId: string, userId: string) => Promise<PostDTO[]>
  getPostsLikes: (userId: string) => Promise<PostDTO[]>
  getPostsRetweet: (userId: string) => Promise<PostDTO[]>
  getReplies: (authorId: string, postId: string) => Promise<PostDTO[]>
}