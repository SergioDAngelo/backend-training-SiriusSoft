export type ClassType<T> = new (...args: any[]) => T

/**
 * @typedef CursorPagination
 *
 * @description Cursor-Based Pagination or Keyset Pagination
 *
 * Read more about Cursor Pagination https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
 *
 * Either before or after should be defined, not both at the same time
 *
 * @property {number} limit - The amount of records to return
 * @property {string} before - The id of the record after the last returned record
 * @property {string} after - The id of the record before the first returned record
 */
export interface CursorPagination {
  limit?: number
  before?: string
  after?: string
  skip?: number
}

/**
 * @typedef OffsetPagination
 *
 * @description Offset-Limit Pagination
 *
 * Read more about Offset-Limit Pagination https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
 *
 * @property {number} limit - The amount of records to return
 * @property {number} skip - The amount of records to skip
 */
export interface OffsetPagination {
  limit?: number
  skip?: number
}

export interface Follow {
  id: string; // ID de la relación de seguimiento
  followerId: string; // ID del usuario que sigue
  followedId: string; // ID del usuario que es seguido
  createdAt: Date; // Fecha de creación de la relación de seguimiento
}