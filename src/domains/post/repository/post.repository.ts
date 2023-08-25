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
  getPostsLikes: (userId: string) => Promise<PostDTO[]>
  getPostsRetweet: (userId: string) => Promise<PostDTO[]>
  getReplies: (authorId: string) => Promise<PostDTO[]>
}
