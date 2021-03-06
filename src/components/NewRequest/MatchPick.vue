<template>
<section>
    <n-input-group style="margin-top: 4rem; justify-content: center;">
        <n-input v-model:value="searchMatchID" :loading="loading" :style="{ width: '50%' }" clearable placeholder="Enter Match ID" />
        <n-button @click="getUserMatch" type="primary" ghost>Search</n-button>
    </n-input-group>
    <n-card v-if="foundMatch && searchMatchID && searchMatchID === foundMatch.match_id.toString()" :style="foundMatch.match_id.toString() === chosenMatchID ? 'border-color: #63e2b7; margin-top: 1rem;' : 'margin-top: 1rem;'">
        <n-thing>
            <template #header>
                Match ID {{foundMatch.match_id}} 
            </template>
            <template #description> {{convertTimestamp(foundMatch.start_time)}} </template>
            Please choose hero you played
            <n-data-table
                style="margin-top: 1rem;"
                :row-key="(row: any) => row.hero_id" 
                @update:checked-row-keys="handleCheck"
                :default-checked-row-keys="[heroPlayed]"
                :columns="columns"
                :data="foundMatch.players"
            />
            <template #header-extra>
                <n-button @click="onChoose(foundMatch!.match_id.toString(), heroPlayed)" size="small" style="margin: auto;">
                    Choose match
                </n-button>
            </template>
        </n-thing>
    </n-card>
    <n-p style="text-align: center; margin-top: 1rem;">Or</n-p>
    <n-p style="text-align: center;">Choose from recent matches</n-p>
    <n-grid v-if="matches.length > 0" :cols="4" style="margin: auto; margin-top: 2rem;" :x-gap="22" :y-gap="42" >
        <n-gi v-for="match in matches" :key="match.match_id">
        <n-card :style="match.match_id.toString() === chosenMatchID ? 'border-color: #63e2b7;' : ''">
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
                    <n-button @click="onChoose(match.match_id.toString(), match.hero_id)" size="small" style="margin: auto;">
                    Choose match
                    </n-button>
                </template>
            </n-thing>
        </n-card>
        </n-gi>
    </n-grid>
</section>
</template>

<script setup lang="ts">
import { Ref, ref, computed, h } from 'vue';
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex';
import { IMatch, IMinimalMatch } from '/@/interfaces/match'
import { getMatch } from '/@/api/matches.api';

const props = defineProps({
	matches: {
		type: Array as () => Array<IMatch>,
		required: true
	}
})

const matches = computed(() => props.matches)

const loading = ref(false)
const message = useMessage()
const store = useStore()

const foundMatch = ref(null) as Ref<IMinimalMatch | null>
const searchMatchID = ref("")
const chosenMatchID = computed(() => store.getters.reviewRequestMatch)
const heroPlayed = computed(() => store.getters.reviewRequestHeroPlayed)

const convertTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toDateString()
}

const getUserHeroPlayed = (match: IMinimalMatch) => {
    const players = match.players
    const userHeroPlayed = players.filter((el) => el.account_id.toString() === store.state.user.steam32Id)
    if (userHeroPlayed) {
        store.commit('SET_HEROPLAYED', userHeroPlayed[0].hero_id)
    }
}

const getUserMatch = async () => {
    await getMatch(searchMatchID.value)
    .then((resp) => {
        loading.value = true
        foundMatch.value = resp.data
        getUserHeroPlayed(foundMatch.value)
    })
    .catch((err) => {
        message.error(err.message)
    })
    .finally(() => loading.value = false)
}

const columns = [
    {
    type: 'selection',
    disabled (row: any, index: number) {
        if (heroPlayed.value) {
            return row.hero_id !== heroPlayed.value
        }
    },
    },
    {
      title: 'Hero',
      key: 'hero',
      render (row: any) {
        return h(
          'i',
          {
            class: `d2mh hero-${row.hero_id}`,
          }
        )
      }
    },
    {
      title: 'Kills',
      key: 'kills'
    },
    {
      title: 'Deaths',
      key: 'deaths'
    },
    {
      title: 'Assists',
      key: 'assists'
    },
]

const onChoose = (matchId: string, heroId: number) => {
    if (matchId === chosenMatchID.value) {
        matchId = ""
        heroId = 0
    }
    store.commit('SET_MATCHID', matchId)
    store.commit('SET_HEROPLAYED', heroId)
}

const handleCheck = (rowKeys: Array<string>) => {
    store.commit('SET_HEROPLAYED', rowKeys[0])
}
</script>