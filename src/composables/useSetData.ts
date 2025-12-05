/**
 * useSetData.ts
 * （ブログ・カテゴリ・プロフィール・アーカイブを一括で管理）
 * @package composposables
 */

/* types */
import type { BlogItemType } from '@/types/Blog'
import type { CategoryType } from '@/types/Category'
import type { ProfileType } from '@/types/Profile'
import type { ArchiveType } from '@/types/Archive'

/**
 * useSetData
 */
export const useSetData = () => {
// ★ 各ドメインの状態
  const blogList = useState<BlogItemType[]>('blogList', () => [])
  const blogTotalCount = useState<number>('blogTotalCount', () => 0)
  const categories = useState<CategoryType[]>('categories', () => [])
  const profile = useState<ProfileType | null>('profile', () => null)
  const archiveList = useState<ArchiveType[]>('archiveList', () => [])

  /**
   * setBlogData
   * ブログ一覧と件数をまとめて反映
   */
  const setBlogData = (list: BlogItemType[], total: number) => {
    blogList.value = list
    blogTotalCount.value = total
  }

  /**
   * setCategoryData
   */
  const setCategoryData = (list: CategoryType[]) => {
    categories.value = list
  }

  /**
   * setProfileData
   */
  const setProfileData = (data: ProfileType) => {
    profile.value = data
  }

  /**
   * setArchiveData
   */
  const setArchiveData = (list: ArchiveType[]) => {
    archiveList.value = list
  }

  return {
    setBlogData,
    setCategoryData,
    setProfileData,
    setArchiveData,
  }
}
