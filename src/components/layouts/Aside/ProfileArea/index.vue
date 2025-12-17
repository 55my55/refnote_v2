<script setup lang="ts">
/**
 * layouts/Aside/ProfileArea
 * @package Component
 */
import { computed } from 'vue'
import BasicAsidePartsArea from '~/components/layouts/Aside/BasicAsidePartsArea/index.vue'
import XIcon from '~/components/common/icons/XIcon/index.vue'
import GithubIcon from '~/components/common/icons/GithubIcon/index.vue'
import FaceBookIcon from '~/components/common/icons/FaceBookIcon/index.vue'
import { useProfilePageTransition } from '~/composables/useProfilePageTransition'
import type { ProfileType } from '~/types/Profile'
import styles from './styles.module.scss'

const AVATAR_SIZE = 120

const profileState = useState<ProfileType | null>('profile')
const profile = computed(() => profileState.value)
const { onClickTransitionProfilePage } = useProfilePageTransition()

const image = computed(() => {
  const fallback = {
    url: '/favicon.ico',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  }
  if (profile.value?.userImage?.url) {
    return {
      url: profile.value.userImage.url,
      width: profile.value.userImage.width || fallback.width,
      height: profile.value.userImage.height || fallback.height,
    }
  }
  return fallback
})

const snsLinks = computed(() =>
  [
    { icon: XIcon, url: profile.value?.twitter },
    { icon: GithubIcon, url: profile.value?.github },
    { icon: FaceBookIcon, url: profile.value?.facebook },
  ].filter((item) => !!item.url)
)
</script>

<template>
  <BasicAsidePartsArea title="プロフィール">
    <div v-if="profile" :class="styles.container">
      <div :class="styles.image">
        <NuxtImg
          :src="image.url"
          :alt="profile?.name || 'Profile image'"
          :width="AVATAR_SIZE"
          :height="AVATAR_SIZE"
          sizes="(max-width: 768px) 100px, 120px"
          format="webp"
          :quality="75"
          :class="styles.image__pic"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div :class="styles.profile">
        <p :class="styles.profile__name">{{ profile?.name || 'No Name' }}</p>
        <p :class="styles.profile__eng_name">
          {{ profile?.englishName || '' }}
        </p>
        <p :class="styles.profile__position">
          {{ profile?.position || '' }}
        </p>
      </div>

      <div :class="styles.border" />

      <ul v-if="snsLinks.length" :class="styles.sns">
        <li
          v-for="(sns, index) in snsLinks"
          :key="`sns-${index}`"
          :class="styles.sns__icon"
        >
          <a
            :href="sns.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="sns.icon" />
          </a>
        </li>
      </ul>

      <button
        data-test-id="test-more-responsive"
        :class="styles.button"
        @click="onClickTransitionProfilePage"
      >
        more
      </button>
    </div>
  </BasicAsidePartsArea>
</template>
