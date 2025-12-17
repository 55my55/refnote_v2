/**
 * アーカイブ（月別一覧）のinterface
 * @package types
 */

/**
 * アーカイブモデル
 * 「2025年1月の記事一覧」などを作るためのUI専用データ
 */
export interface ArchiveType {
  originDate: string // その月の開始日 (例: 2024-11-01)
  linkDate: string // URL用値 (例: 2024/11)
  showDate: string // UI表示用 (例: 2024年11月)
}
