/**
 * Meta情報のinterface
 * @package types
 */

/**
 * メタ情報共通モデル（SEO / OGP 用）
 */
export interface MetaHeadType {
  title: string
  description: string
  keyword: string
  image: string
  url: string
}
