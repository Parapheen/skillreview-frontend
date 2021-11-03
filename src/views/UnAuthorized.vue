<template>
  <n-result
    status="403"
    title="403 Forbidden"
    description="Some of the doors are always close to you."
    style="margin-top: 4rem;"
  >
    <template #footer>
      <n-a :href="steamLogin">It's easy peasy. Just login with Steam</n-a>
    </template>
  </n-result>
</template>

<script setup lang="ts">

const steamLogin = `${import.meta.env.VITE_APP_API_URL}/auth/steam`;

</script>