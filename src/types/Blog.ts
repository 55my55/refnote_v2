/**
 * Blog記事のinterface
 * @package types
 */
import type { CategoryType } from './Category'
import type { ImageType } from './Image'

/**
 * ブログ詳細モデル
 */
export interface BlogItemType {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  description: string
  body: string
  image: ImageType
  categories: CategoryType[]
  slug: string
}

/**
 * ブログ一覧レスポンスモデル
 */
export interface BlogDataType {
  blogList: BlogItemType[]
  totalCount: number
}

/**
 * 目次モデル
 */
export interface TableOfContentType {
  text: string   
  id: string    
  name: string 
}
