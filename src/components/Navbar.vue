<template>
    <nav>
        <n-space justify="space-between" align="center" size="large">
            <n-a href="/" style="text-decoration: none;">
                <h3 style="font-weight: 200; letter-spacing: 0.05rem;">SkillReview</h3>
            </n-a>
            <div>
                <n-button style="margin-right: 1rem;" type="info" ghost @click="router.push('/requests')">Review Skills</n-button>
                <n-button v-if="!isLoggedIn" @click="login" style="margin-right: 0;">Login with Steam</n-button>
                <n-dropdown v-else trigger="click" :options="options">
                    <n-badge :value="user.plan" :type="user.plan === 'basic' ? 'info' : 'success'">
                        <n-avatar
                            round
                            size="medium"
                            :src="user.avatar"
                            style="margin-right: 0; cursor: pointer;"
                        />
                    </n-badge>
                </n-dropdown>
            </div>
        </n-space>
    </nav>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { computed, h } from 'vue';
import { useStore } from 'vuex';
import {
  FingerPrint as FingerPrint,
  AddOutline as Add,
  ShieldCheckmarkSharp as ShieldCheckmarkSharp,
} from '@vicons/ionicons5'
import { useRouter, RouterLink } from 'vue-router';

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const user = computed(() => store.state.user)
const login = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/steam`;
}

function renderIcon (icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const optionsFull = [
    {
    label: () =>
        h(
            RouterLink,
            {
                to: {
                    path: '/me/',
                }
            },
            { default: () => 'Profile' }
        ),
        key: 'profile',
        icon: renderIcon(FingerPrint)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/requests/new',
                    },
                },
                { default: () => 'New match request' }
            ),
            key: 'newRequest',
            icon: renderIcon(Add)
    },
    {
        label: () =>
            h(
                RouterLink,
                 {
                    to: {
                        path: '/pricing/',
                    },
                },
                { default: () => 'Upgrade to Pro' }
            ),
            key: 'upgrade',
            icon: renderIcon(ShieldCheckmarkSharp)
    },
]

const options = computed(() => user.value.plan === 'basic' ? optionsFull : optionsFull.splice(2, 1) )
</script>

<style>
nav {
    max-width: 80vw;
    margin: auto;
}
</style>