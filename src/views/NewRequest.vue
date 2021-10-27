<template>
<n-space vertical>
    <n-input-group style="margin-top: 4rem; justify-content: center;">
        <n-input :loading="loading" :style="{ width: '50%' }" clearable placeholder="Enter Match ID" />
        <n-button @click="loading=!loading" type="primary" ghost>Search</n-button>
    </n-input-group>
    <n-p style="text-align: center; margin-top: 1rem;">Or</n-p>
    <n-p style="text-align: center;">Choose from recent matches</n-p>
    <n-grid v-if="matches.length > 0" :cols="4" style="margin: auto; margin-top: 2rem;" :x-gap="22" :y-gap="42" >
        <n-gi v-for="match in matches" :key="match.match_id">
        <n-card>
            <n-thing>
                <template #avatar>
                <n-avatar round>
                    <i :class="'d2mh hero-' + match.hero_id"/>
                </n-avatar>
                </template>
                <template #header>
                    <n-text :type="match.won_match ? 'success' : 'error'">
                        {{match.won_match ? "Win" : "Lose"}} 
                    </n-text>
                </template>
                <template #description> {{convertTimestamp(match.match_timestamp)}} </template>
                <template #action>
                    <n-button size="small" style="margin: auto;">
                    Choose match
                    </n-button>
                </template>
            </n-thing>
        </n-card>
        </n-gi>
    </n-grid>
</n-space>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import {  useMessage } from 'naive-ui'
import { getRecentMatches } from '../api/user';
import { useStore } from 'vuex';
import { IMatch } from '/@/interfaces/match'

const loading = ref(false)
const message = useMessage()
const matches = ref([]) as Ref<IMatch[]>
const store = useStore()

const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toDateString()
}

onMounted(async () => {
    await getRecentMatches(store.state.user.id, window.localStorage.getItem("token"))
    .then((resp) => {
        matches.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
})

</script>