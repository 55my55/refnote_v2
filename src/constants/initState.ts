// src/constants/initState.ts

/**
 * initState
 * 各種ドメインモデルの初期値
 * @package constants
 */

/* types */
import type { BlogItemType, BlogDataType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { ProfileType } from '@/types/Profile'
import type { ImageType } from '@/types/Image'
import type { FixedArticleType } from '@/types/FixedArticle'

/** 画像の初期値 */
export const initImageState: ImageType = {
  url: '',
  height: 0,
  width: 0,
}

/** ブログ 1 件分の初期値 */
export const initBlogItem: BlogItemType = {
  id: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: '',
  title: '',
  body: '',
  description: '',
  image: initImageState,
  categories: [],
  slug: '',
}

/** カテゴリ 1 件分の初期値 */
export const initCategoryData: CategoryType = {
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: '',
  slug: '',
}

/** プロフィール情報の初期値 */
export const initProfileState: ProfileType = {
  id: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: '',
  name: '',
  englishName: '',
  position: '',
  introduction: '',
  userImage: initImageState,
  articleImage: initImageState,
  description: '',
  contents: '',
  twitter: '',
  github: '',
  facebook: '',
}

/** ブログ一覧＋件数の初期値 */
export const initBlogData: BlogDataType = {
  blogList: [],
  totalCount: 0,
}

/** 固定記事（プライバシーポリシー等）の初期値 */
export const initFixedArticleData: FixedArticleType = {
  id: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: '',
  title: '',
  body: '',
  slug: '',
  image: initImageState,
}
