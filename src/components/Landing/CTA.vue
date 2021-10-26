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
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '/@/router';

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)

const login = () => {
    if (!isLoggedIn.value) {
        window.location.href = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`;
    }
    else {
        router.push('/requests/new')
    }
}

</script>