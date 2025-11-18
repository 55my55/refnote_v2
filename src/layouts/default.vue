<template>
  <div class="default-layout">
    <header class="site-header">
      <div class="site-header__container">
        <NuxtLink to="/" class="site-header__logo">My Tech Blog</NuxtLink>
      </div>
    </header>
    <main class="site-main">
      <div class="site-main__container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
// Global styles
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

a {
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
}
</style>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 10;

  &__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
}

.site-main {
  flex-grow: 1;
  width: 100%;

  &__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }
}
</style>
