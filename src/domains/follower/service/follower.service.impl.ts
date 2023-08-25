import { ForbiddenException, NotFoundException } from "@utils";
import { FollowDTO } from "../dto";
import { FollowRepository } from "../repository";
import { FollowService } from '@domains/follower/service';

export class FollowServiceImpl implements FollowService {
    constructor (private readonly repository: FollowRepository) {}

    async followerCreate (followerId: string, followedId: string): Promise<FollowDTO> {
        return await this.repository.create(followerId, followedId)
      }
    
    async followerDelete (followerId: string, followedId : string): Promise<void> {
        const follow = await this.repository.getFollow(followerId, followedId);
        if (follow) {
          await this.repository.delete(follow.id)
        }
    }

    async getFollow (followerId: string, followedId: string): Promise<FollowDTO> {
      const follow = await this.repository.getFollow(followerId, followedId)
      if (follow) {
        return follow
      } else {
        throw new Error('Relation not found')
      }
    }
}


// import { FollowerService } from './follower.service';
// import { FollowerRepository } from '../repository';
// import { FollowUserDTO } from '../dto';
// import { UserRepository } from '@domains/user/repository';
// import { UserService } from '@domains/user/service';


// export class FollowerServiceImpl implements FollowerService {
//   // private readonly followerRepository: FollowerRepository;

//   // constructor(followerRepository: FollowerRepository) {
//   //   this.followerRepository = followerRepository;
//   // }

//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly followerRepository: FollowerRepository,
//     private readonly userService: UserService // Inyectar UserService
//   ) {}

//   async followUser(followerId: string, followedId: string): Promise<FollowUserDTO> {
//     // Verificar si el usuario ya sigue al objetivo antes de realizar la operación
//     const isFollowing = await this.followerRepository.isFollowing(followerId, followedId);
//     console.log(isFollowing)
//     if (isFollowing) {
//       throw new Error('You are already following this user.');
//     }else {    // Utilizar el repositorio para agregar la relación de seguimiento en la base de datos
//       return await this.followerRepository.followUser(followerId, followedId)};
//   }

//   async unfollowUser(followerId: string, followedId: string): Promise<void> {
//     // Verificar si el usuario ya dejó de seguir al objetivo antes de realizar la operación
//     const isFollowing = await this.followerRepository.isFollowing(followerId, followedId);
//     if (!isFollowing) {
//     throw new Error('You are not following this user.');
//     }
//     // Utilizar el repositorio para eliminar la relación de seguimiento de la base de datos
//     await this.followerRepository.unfollowUser(followerId, followedId);
//   }
//   async someMethod(userId: string): Promise<void> {
//     // Obtener el usuario actual
//     const currentUser = await this.userService.getUser(userId);
//     if (!currentUser) {
//       // Manejar el escenario donde el usuario actual no existe
//       return;
//     }


// }
// }
