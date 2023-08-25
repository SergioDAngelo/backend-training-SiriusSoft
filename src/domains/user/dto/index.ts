import {FollowDTO} from '@domains/follower/dto/index'

export class UserDTO {
  constructor (user: UserDTO) {
    this.id = user.id
    this.name = user.name
    this.createdAt = user.createdAt
    this.isPrivate = user.isPrivate
    // this.follows = user.follows
    // this.followers = user.followers
  }

  id: string
  name: string | null
  createdAt: Date
  isPrivate : boolean
  // follows: FollowUserDTO[]
  // followers: any[]
}

export class ExtendedUserDTO extends UserDTO {
  constructor (user: ExtendedUserDTO) {
    super(user)
    this.email = user.email
    this.username = user.username
    this.password = user.password
  }

  email!: string
  username!: string
  password!: string
}
