<template>
    <nav style="padding: 5px 0;">
        <n-space justify="space-between" align="center" size="large">
            <n-a href="/" style="text-decoration: none;">
                <n-icon size="40">
                    <svg width="135" height="88" viewBox="0 0 135 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.2941 64.0588C44.2941 61.0392 43.2156 58.6862 41.0588 57C38.9411 55.3137 35.196 53.5686 29.8235 51.7647C24.451 49.9607 20.0588 48.2156 16.647 46.5294C5.54901 41.0784 -2.49926e-06 33.5882 0 24.0588C0 19.3137 1.37255 15.1372 4.11765 11.5294C6.90196 7.88234 10.8235 5.05881 15.8823 3.05882C20.9412 1.0196 26.6274 0 32.9412 0C39.098 0 44.6078 1.09804 49.4706 3.29412C51.8596 4.3644 53.9878 5.65822 55.8552 7.1756C57.1081 6.30207 58.4569 5.5181 59.9017 4.8237C64.9605 2.39233 70.9409 1.17665 77.8429 1.17665C88.2742 1.17665 96.4899 3.88253 102.49 9.2943C108.49 14.7061 111.549 22.1178 111.666 31.5296V51.7647L135 87.9999H113L90.9017 51.7647V31.1178C90.6664 21.7453 86.3134 17.059 77.8429 17.059C73.5683 17.059 70.3331 18.2355 68.137 20.5884C65.9409 22.9413 64.8429 26.7649 64.8429 32.059L64.8429 46.1973C61.4265 42.0781 56.7454 38.6323 51.0671 35.8424C49.0413 34.8414 46.7467 33.843 44.1958 32.8445V31.9413C44.1958 30.085 44.3113 28.3006 44.5424 26.5882H44.3529C44.3529 23.098 43.2745 20.3921 41.1176 18.4706C39 16.549 36.1176 15.5882 32.4706 15.5882C28.7843 15.5882 25.8627 16.4117 23.7059 18.0588C21.5882 19.6666 20.5294 21.7255 20.5294 24.2353C20.5294 26.4313 21.7059 28.4313 24.0588 30.2353C26.4117 32 30.549 33.8431 36.4706 35.7647C42.3921 37.647 47.2549 39.6862 51.0588 41.8823C60.3137 47.2157 64.9411 54.5686 64.9411 63.9411C64.9411 71.4313 62.1176 77.3137 56.4705 81.5882C50.8235 85.8627 43.0784 87.9999 33.2352 87.9999L33.2353 72.4705C36.647 72.4705 39.3333 71.745 41.2941 70.2941C43.2941 68.8039 44.2941 66.7254 44.2941 64.0588Z" fill="#63E2B7"/>
                    </svg>
                </n-icon>
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
    <n-alert v-if="user.email === '' && user.token !== ''">
        <n-input-group style="justify-content: center;">
            <n-input v-model:value="userEmail" size="small" :style="{ width: '30%' }" clearable placeholder="Enter your email to finish registration" />
            <n-button @click="send" size="small" type="primary" ghost>Submit</n-button>
        </n-input-group>
    </n-alert>
</template>

<script lang="ts" setup>
import { NIcon, useMessage } from 'naive-ui';
import { computed, h, ref } from 'vue';
import { useStore } from 'vuex';
import {
  FingerPrint as FingerPrint,
  AddOutline as Add,
  ShieldCheckmarkSharp as ShieldCheckmarkSharp,
} from '@vicons/ionicons5'
import { useRouter, RouterLink } from 'vue-router';
import { IUserUpdate } from '../interfaces/user';
import { updateUser } from '../api/user.api';

const store = useStore()
const router = useRouter()
const message = useMessage()
const userEmail = ref("")

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const user = computed(() => store.getters.getUser)
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

const send = async () => {
    let update: IUserUpdate = {
        email: userEmail.value
    }
    await updateUser(user.value.id, user.value.token, update)
        .then((resp) => {
            message.success('Successfully added email!')
            resp.data.token = user.value.token
            store.commit('SET_USER', resp.data)
        })
        .catch((err) => {
            message.error(err.message)
        })
}
</script>

<style>
nav {
    max-width: 80vw;
    margin: auto;
}
</style>