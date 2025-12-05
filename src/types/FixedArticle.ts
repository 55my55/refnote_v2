/**
 * 固定記事のinterface
 * @package types
 */
import type { ImageType } from './Image'

/**
 * 固定記事モデル
 * 利用規約、プライバシーポリシー、About など
 */
export interface FixedArticleType {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
  slug: string
  image: ImageType
}
