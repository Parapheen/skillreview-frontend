<template>
<n-space vertical justify="center" style="margin-top: 4rem;">
        <n-divider>
            <n-h2>Become a Reviewer</n-h2>
        </n-divider>
        <n-card justify="center" align="center">
            <n-h3 style="text-align: center; margin: 0;">Join our close expert community of reviewers and earn gifts.</n-h3>
            <n-button @click="login" size="large" style="margin-top: 1rem;">Join now</n-button>
        </n-card>
</n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '/@/router';

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)

const login = () => {
    if (!isLoggedIn.value) {
        window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/steam`;
    }
    else {
        router.push('/reviewers/new')
    }
}

</script>
