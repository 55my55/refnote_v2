/**
 * ブログ記事関連のロジック
 * @package logics
 */
import type { BlogItemType } from '@/types/Blog'

/**
 * ブログ記事検索処理
 * ブログ記事タイトルと部分一致のものを返す
 */
export const searchBlogListLogic = (
  blogList: BlogItemType[],
  keyword: string
): BlogItemType[] => {
  return blogList.filter((blog) => blog.title.indexOf(keyword) > -1)
}
