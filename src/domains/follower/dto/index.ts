export class FollowDTO {
  constructor (follower: FollowDTO) {
      this.id = follower.id
      this.followerId = follower.followerId
      this.followedId = follower.followedId
      this.createdAt = follower.createdAt
      this.updatedAt = follower.updatedAt
      this.deletedAt = follower.deletedAt
    }
  
    id: string
    followerId: string
    followedId: string
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
}


// import { UserDTO } from "@domains/user/dto";


// export class FollowUserDTO{
//   constructor (follower: FollowUserDTO){
//    this.id = follower.id   
//    this.followedId = follower.followedId
//    this.followerId = follower.followerId
//    this.createdAt = follower.createdAt
//   }
//     id: string; // ID de la relación de seguimiento
//     followerId: string; // ID del usuario que sigue
//     followedId: string; // ID del usuario que es seguido
//     createdAt: Date; // Fecha de creación de la relación de seguimiento
// }