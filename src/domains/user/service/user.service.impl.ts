import { NotFoundException } from '@utils/errors'
import { OffsetPagination } from 'types'
import { UserDTO } from '../dto'
import { UserRepository } from '../repository'
import { UserService } from './user.service'

export class UserServiceImpl implements UserService {
  constructor (private readonly repository: UserRepository) {}

  async getUser (userId: any): Promise<UserDTO> {
    const user = await this.repository.getById(userId)
    if (!user) throw new NotFoundException('user')
    return user
  }
  
  async getUserRecommendations (userId: any, options: OffsetPagination): Promise<UserDTO[]> {
    return await this.repository.getRecommendedUsersPaginated(options)
  }

  async deleteUser (userId: any): Promise<void> {
    await this.repository.delete(userId)
  }

  async updateProfilePrivacy(userId: any, isPrivate: boolean): Promise<void> {
    try {
      await this.repository.updatePrivacy(userId, isPrivate); // Actualiza la privacidad del perfil en el repositorio
    } catch (error) {
      throw new Error('Error updating profile privacy');
    }
  }
}
