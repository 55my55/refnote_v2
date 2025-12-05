/**
 * プレビューAPI（Nuxt 4版）
 * microCMS のドラフトプレビュー用
 */

import globalAxios from '@/config/globalAxios'

/**
 * microCMS から取得するデータ型
 * （ここでは id だけ分かればよい）
 */
type MicroCMSPreviewResponse = {
  id: string
}

/**
 * BASE_URL
 * NEXT_PUBLIC_BASE_URL の代わりに NUXT_PUBLIC_BASE_URL を参照
 */
const BASE_URL = `${
  process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000/'
}blogs/`

export default defineEventHandler(async (event) => {
  // クエリ取得
  const query = getQuery(event)

  const slug = typeof query.slug === 'string' ? query.slug : ''
  const draftKey = typeof query.draftKey === 'string' ? query.draftKey : ''

  // slug がない場合は 404
  if (!slug) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  // microCMS から該当記事を取得（id だけ確認できればOK）
  const content = await globalAxios
    .get<MicroCMSPreviewResponse>(
      `${BASE_URL}${slug}?fields=id&draftKey=${draftKey}`
    )
    .then((res) => res.data as MicroCMSPreviewResponse)
    .catch(() => null as MicroCMSPreviewResponse | null)

  if (!content || !content.id) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid slug' })
  }

  /**
   * Next の `res.setPreviewData` の代わりに、
   * draftKey をクエリに付けて対象ページへ 307 リダイレクトする。
   * フロント側では `route.query.draftKey` を見てプレビュー用取得を行う想定。
   */
  const redirectPath = `/${content.id}?draftKey=${encodeURIComponent(
    draftKey
  )}`

  return sendRedirect(event, redirectPath, 307)
})
