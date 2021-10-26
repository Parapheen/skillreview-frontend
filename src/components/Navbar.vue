<template>
    <nav>
        <n-space justify="space-between" align="center" size="large">
            <n-a href="/" style="text-decoration: none;">
                <h3 style="font-weight: 200; letter-spacing: 0.05rem;">SkillReview</h3>
            </n-a>
            <n-button @click="login" style="margin-right: 0;">Login with Steam</n-button>
        </n-space>
    </nav>
</template>

<script lang="ts" setup>
const login = () => {
    window.location.href = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`;
}
</script>

<style>
nav {
    max-width: 80vw;
    margin: auto;
}
</style>