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

const steamLogin = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`

</script>