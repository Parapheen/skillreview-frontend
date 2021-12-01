<template>
<section>
    <n-space vertical justify="center" align="center" size="small" class="jumbo-head">
        <n-h1 style="text-align: center; font-weight: bold; font-size: 3rem; margin: 0;">
            Improve your gaming skill.
        </n-h1>
        <n-h4 style="text-align: center;">
            Review games, learn from others and teach others. <br/>
            <n-p depth=3 style="margin-top: 0;">
                We only support Dota 2 for now.
            </n-p>
        </n-h4>
        <n-button @click="login" size="large" type="primary">
            Start now
        </n-button>
    </n-space>
</section>
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
        router.push('/requests/new')
    }
}
</script>