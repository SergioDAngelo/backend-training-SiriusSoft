import { CreatePostInputDTO, PostDTO } from '../dto'

export interface PostService {
  createPost: (userId: string, body: CreatePostInputDTO) => Promise<PostDTO>
  deletePost: (userId: string, postId: string) => Promise<void>
  getPost: (userId: any, postId: string) => Promise<PostDTO>
  getLatestPosts: (userId: any, options: { limit?: number, before?: string, after?: string }) => Promise<PostDTO[]>
  getPostsByAuthor: (userId: any, authorId: string, options: { limit?: number, before?: string, after?: string }) => Promise<PostDTO[] | undefined>
  getComments: (postId: string, userId: string) => Promise<PostDTO[]>
  getLikedPosts: (userId: string) => Promise<PostDTO[]>
  getRetweetedPosts: (userId: string) => Promise<PostDTO[]>
  getReplies: (authorId: string, postId: string) => Promise<PostDTO[]>
  //updatePost: (userId: any, postId: string, data: any ) => Promise<PostDTO>
}

// import { CreatePostInputDTO, PostDTO } from '../dto'

// export interface PostService {
//   createPost: (userId: string, body: CreatePostInputDTO) => Promise<PostDTO>
//   deletePost: (userId: string, postId: string) => Promise<void>
//   getPost: (userId: string, postId: string) => Promise<PostDTO>
//   getLatestPosts: (userId: string, options: { limit?: number, before?: string, after?: string }) => Promise<PostDTO[]>
//   getPostsByAuthor: (userId: any, authorId: string) => Promise<PostDTO[]>
// }
