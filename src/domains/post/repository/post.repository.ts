import { CursorPagination } from '@types'
import { CreatePostInputDTO, PostDTO } from '../dto'
import { UserDTO } from '@domains/user/dto'

export interface PostRepository {
  create: (userId: string, data: CreatePostInputDTO) => Promise<PostDTO>
  getAllByDatePaginated: (options: CursorPagination) => Promise<PostDTO[]>
  delete: (postId: string) => Promise<void>
  getById: (postId: string) => Promise<PostDTO | null>
  getByAuthorId: (authorId: string, options: CursorPagination) => Promise<PostDTO[]>
  getComments: (postId: string) => Promise<PostDTO[]>
  getLikedPosts: (userId: string) => Promise<PostDTO[]>
  getRetweetedPosts: (userId: string) => Promise<PostDTO[]>
  getReplies: (authorId: string) => Promise<PostDTO[]>
  //update: (postId: string, data: PostDTO) => Promise<PostDTO>
}



// import { CursorPagination } from '@types'
// import { CreatePostInputDTO, PostDTO } from '../dto'

// export interface PostRepository {
//   create: (userId: string, data: CreatePostInputDTO) => Promise<PostDTO>
//   getAllByDatePaginated: (options: CursorPagination) => Promise<PostDTO[]>
//   delete: (postId: string) => Promise<void>
//   getById: (postId: string) => Promise<PostDTO | null>
//   getByAuthorId: (authorId: string) => Promise<PostDTO[]>
//   getPostsByUserIds(userIds: string[], options: CursorPagination): Promise<PostDTO[]>;

// }
