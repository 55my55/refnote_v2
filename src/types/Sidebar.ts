/**
 * サイドバー表示用のまとめデータ
 * @package types
 */

import type { ArchiveType } from './Archive'
import type { CategoryType } from './Category'
import type { ProfileType } from './Profile'

export interface SidebarDataType {
  categories: CategoryType[]
  profile: ProfileType
  archiveList: ArchiveType[]
}
