<template>
    <nav>
        <n-space justify="space-between" align="center" size="large">
            <n-a href="/" style="text-decoration: none;">
                <h3 style="font-weight: 200; letter-spacing: 0.05rem;">SkillReview</h3>
            </n-a>
            <n-button v-if="!isLoggedIn" @click="login" style="margin-right: 0;">Login with Steam</n-button>
            <n-dropdown v-else @select="handleSelect" trigger="click" :options="options">
                <n-avatar
                    round
                    size="medium"
                    :src="user.avatar"
                    style="margin-right: 0; cursor: pointer;"
                />
            </n-dropdown>
        </n-space>
    </nav>
</template>

<script lang="ts" setup>
import { NIcon, useMessage } from 'naive-ui';
import { computed, h } from 'vue';
import { useStore } from 'vuex';
import {
  FingerPrint as FingerPrint,
  AddOutline as Add,
} from '@vicons/ionicons5'

const store = useStore()

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const user = computed(() => store.state.user)
const login = () => {
    window.location.href = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`;
}

function renderIcon (icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const options = [
    {
    label: () =>
        h(
            'a',
            {
            href: '/me',
            },
            'Profile'
        ),
        key: 'profile',
        icon: renderIcon(FingerPrint)
    },
    {
        label: () =>
            h(
                'a',
                {
                href: '/requests/new',
                },
                'New match request'
            ),
            key: 'newRequest',
            icon: renderIcon(Add)
    },
]
const message = useMessage()

const handleSelect = (key: string) => {
    message.info(key)
}
</script>

<style>
nav {
    max-width: 80vw;
    margin: auto;
}
</style>