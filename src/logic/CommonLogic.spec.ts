/**
 * CommonLogic.spec
 * @package logic
 */
import { ref } from 'vue'
import type { Router } from 'vue-router'
import {
  createPageArrayLogic,
  isNotSearchPageLogic,
  selectMetaDataTitleLogic,
  selectMetaDataDescriptionLogic,
  selectMetaDataImageLogic,
  selectMetaDataUrlLogic,
  createShareUrlLogic,
} from './CommonLogic'
import {
  BASE_TITLE,
  BLOG_SHOW_COUNT,
  METADATA_DESCRIPTION,
  METADATA_IMAGE,
  REFNOTE_URL,
} from '@/constants/config'
import { ROUTER_PATH_NAME } from '@/constants/navigation'

const createRouterMock = (path: string, fullPath: string = path): Router => {
  return {
    currentRoute: ref({
      path,
      fullPath,
    }),
  } as Router
}

describe('【Logicテスト】CommonLogic', () => {
  describe('【関数テスト】createPageArrayLogic', () => {
    test('【正常系】記事数が0の時、ページ番号配列は[1]', () => {
      expect(createPageArrayLogic(0)).toEqual([1])
    })
    test('【正常系】記事数が1未満の最大値の場合、ページ番号配列は[1]', () => {
      expect(createPageArrayLogic(BLOG_SHOW_COUNT - 1)).toEqual([1])
    })
    test('【正常系】記事数が表示件数と同じ場合、ページ番号配列は[1,2]', () => {
      expect(createPageArrayLogic(BLOG_SHOW_COUNT)).toEqual([1, 2])
    })
    test('【異常系】記事数が-1の時、ページ番号配列は[]', () => {
      expect(createPageArrayLogic(-1)).toEqual([])
    })
  })

  describe('【関数テスト】isNotSearchPageLogic', () => {
    test('【正常系】pathNameが「/search」の場合、結果はfalse', () => {
      expect(isNotSearchPageLogic('/search')).toBe(false)
    })
    test('【正常系】pathNameが「検索」以外の場合、結果はtrue', () => {
      expect(isNotSearchPageLogic('/about')).toBe(true)
    })
  })

  describe('【関数テスト】selectMetaDataTitleLogic', () => {
    test('【正常系】「アーカイブ」ページの場合、想定した文字列が返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.ARCHIVE)
      const title = '2月10日'
      const expectResult = `「${title}」の記事一覧 | ${BASE_TITLE}`
      expect(selectMetaDataTitleLogic({ router, title })).toBe(expectResult)
    })
    test('【正常系】「ブログ記事」ページの場合、想定した文字列が返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.BLOG_ITEM)
      const title = 'Vueの記事'
      const expectResult = `${title} | ${BASE_TITLE}`
      expect(selectMetaDataTitleLogic({ router, title })).toBe(expectResult)
    })
    test('【正常系】「TOP」ページの場合、ベースタイトルが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      expect(selectMetaDataTitleLogic({ router })).toBe(BASE_TITLE)
    })
    test('【異常系】errorFlgがtrueの場合、「NOT FOUND」を含むタイトルが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      const expectResult = `NOT FOUND | ${BASE_TITLE}`
      expect(selectMetaDataTitleLogic({ router, errorFlg: true })).toBe(expectResult)
    })
  })

  describe('【関数テスト】selectMetaDataDescriptionLogic', () => {
    test('【正常系】「ブログ記事」ページの場合、説明文が返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.BLOG_ITEM)
      const description = 'ブログ記事です。'
      expect(selectMetaDataDescriptionLogic({ router, description })).toBe(description)
    })
    test('【正常系】「ポリシー」ページの場合、固定文言が返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.POLICY)
      expect(selectMetaDataDescriptionLogic({ router })).toBe(METADATA_DESCRIPTION.POLICY)
    })
    test('【異常系】errorFlgがtrueの場合、基本文言が返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      expect(selectMetaDataDescriptionLogic({ router, errorFlg: true })).toBe(
        METADATA_DESCRIPTION.BASIC,
      )
    })
  })

  describe('【関数テスト】selectMetaDataImageLogic', () => {
    test('【正常系】「ブログ記事」ページの場合、画像URLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.BLOG_ITEM)
      const image = 'https://example.com/og.png'
      expect(selectMetaDataImageLogic({ router, image })).toBe(image)
    })
    test('【正常系】それ以外の場合、固定画像URLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      expect(selectMetaDataImageLogic({ router })).toBe(METADATA_IMAGE.BASIC)
    })
  })

  describe('【関数テスト】selectMetaDataUrlLogic', () => {
    test('【正常系】「TOP」ページの場合、トップURLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      expect(selectMetaDataUrlLogic({ router })).toBe(REFNOTE_URL)
    })
    test('【正常系】「検索」ページの場合、検索URLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.SEARCH)
      expect(selectMetaDataUrlLogic({ router })).toBe(REFNOTE_URL + ROUTER_PATH_NAME.SEARCH)
    })
    test('【正常系】その他ページの場合、fullPathが含まれる。', () => {
      const fullPath = '/category/vue?page=2'
      const router = createRouterMock('/category/vue', fullPath)
      expect(selectMetaDataUrlLogic({ router })).toBe(REFNOTE_URL + fullPath)
    })
    test('【異常系】errorFlgがtrueの場合、トップURLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP)
      expect(selectMetaDataUrlLogic({ router, errorFlg: true })).toBe(REFNOTE_URL)
    })
  })

  describe('【関数テスト】createShareUrlLogic', () => {
    test('【正常系】fullPathがある場合、shareURLが返却される。', () => {
      const fullPath = '/blog/abc?draft=1'
      const router = createRouterMock('/blog/abc', fullPath)
      expect(createShareUrlLogic(router)).toBe(REFNOTE_URL + fullPath)
    })
    test('【異常系】fullPathが空の場合、トップURLが返却される。', () => {
      const router = createRouterMock(ROUTER_PATH_NAME.TOP, '')
      expect(createShareUrlLogic(router)).toBe(REFNOTE_URL)
    })
  })
})
