// src/composables/useMetaData.ts

/**
 * useMetaData
 * ページ単位の Meta 情報（title/description/ogp 等）の生成責務を管理するロジック
 * UI 層から SEO 設定を切り離し、集中管理するための分離レイヤー
 */


import { ref } from 'vue'
import { useRouter } from 'vue-router'
/* logics */
import {
  selectMetaDataTitleLogic,
  selectMetaDataDescriptionLogic,
  selectMetaDataImageLogic,
  selectMetaDataUrlLogic,
} from '@/logic/CommonLogic'
/* constants */
import { METADATA_KEYWORD } from '@/constants/config'
/* types */
import type { MetaHeadType } from '@/types/MetaHead'

interface UseMetaDataParam {
  title?: string
  description?: string
  imagePath?: string
  errorFlg?: boolean
}

export const useMetaData = (param: UseMetaDataParam) => {
  const { title, description, imagePath, errorFlg } = param

  // router
  const router = useRouter()


  const metaData = ref<MetaHeadType>({
    title: selectMetaDataTitleLogic({ router, title, errorFlg }),
    description: selectMetaDataDescriptionLogic({
      router,
      description,
      errorFlg,
    }),
    keyword: METADATA_KEYWORD.BASIC,
    image: selectMetaDataImageLogic({ router, image: imagePath, errorFlg }),
    url: selectMetaDataUrlLogic({ router, errorFlg }),
  })

  return {
    metaData,
  }
}
