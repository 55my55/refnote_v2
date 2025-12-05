<script setup lang="ts">
import SearchInputForm from '@/components/common/molecules/SearchInputForm/index.vue'
import CloseIcon from '@/components/common/icons/CloseIcon/index.vue'

const props = defineProps<{
  searchText: string
  isSearchModalVisible: boolean
  handleCloseSearchModal: () => void
  onChangeSearchText: (e: Event) => void
  onKeyUpSearch: (e: KeyboardEvent) => void
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.isSearchModalVisible"
      :class="$style.overlay_base"
      @click.self="props.handleCloseSearchModal"
    >
      <div :class="$style.content_base">
        <SearchInputForm
          :text="props.searchText"
          placeholder="検索"
          :onChange="props.onChangeSearchText"
          :onKeyUp="props.onKeyUpSearch"
        />

        <div :class="$style.close" @click="props.handleCloseSearchModal">
          <CloseIcon :size="32" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style module lang="scss" src="./styles.module.scss"></style>
