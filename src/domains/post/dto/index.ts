import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreatePostInputDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
    content!: string

  @IsOptional()
  @MaxLength(4)
    images?: string[]

  @IsOptional()
    isAComment?: boolean
    
  @IsOptional()
    threadId?: string | null
}

export class PostDTO {
  constructor (post: PostDTO) {
    this.id = post.id
    this.authorId = post.authorId
    this.content = post.content
    this.images = post.images
    this.isAComment = post.isAComment
    this.threadId = post.threadId
    this.createdAt = post.createdAt
  }

  id: string
  authorId: string
  content: string
  images: string[]
  isAComment?: boolean
  threadId?: string | null
  createdAt: Date
}


// import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

// export class CreatePostInputDTO {
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(240)
//     content!: string

//   @IsOptional()
//   @MaxLength(4)
//     images?: string[]
// }

// export class PostDTO {
//   constructor (post: PostDTO) {
//     this.id = post.id
//     this.authorId = post.authorId
//     this.content = post.content
//     this.images = post.images
//     this.createdAt = post.createdAt
//   }

//   id: string
//   authorId: string
//   content: string
//   images: string[]
//   createdAt: Date
// }
