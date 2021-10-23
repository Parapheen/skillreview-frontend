<template>
<n-space vertical justify="center" style="margin-top: 4rem;">
        <n-divider>
            <n-h2>Ready to try?</n-h2>
        </n-divider>
        <n-card justify="center" align="center">
            <n-h3 style="text-align: center; margin: 0;">Sign in with Steam</n-h3>
            <n-p style="text-align: center;">Try it now for free.</n-p>
            <n-button @click="login" size="large" style="margin-top: 1rem;">Get Started</n-button>
        </n-card>
</n-space>
</template>

<script setup lang="ts">
const login = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/steam?state=${window.location}`;
}

</script>