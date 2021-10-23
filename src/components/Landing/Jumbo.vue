<template>
<n-space vertical justify="center" align="center" size="small" class="jumbo-head">
    <n-h1 style="text-align: center; font-weight: bold; font-size: 3rem; margin: 0;">
        Improve your skill with <n-gradient-text type="success">SkillReview</n-gradient-text>
    </n-h1>
    <n-h4 style="text-align: center;">
        Review games, learn from others and earn money. <br/>
        We only support Dota 2 for now.
    </n-h4>
    <n-button @click="login" size="large" ghost type="primary">
        Start now
    </n-button>
</n-space>
</template>

<script setup lang="ts">
const login = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/steam?state=${window.location}`;
}
</script>