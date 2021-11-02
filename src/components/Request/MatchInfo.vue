<template>
<n-skeleton v-if="loading" text :repeat="6" />
<n-data-table
    v-else
    style="margin-top: 1rem;"
    :row-key="(row: any) => row.hero_id" 
    :columns="columns"
    :data="foundMatch?.players"
/>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { h, onMounted, computed, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { getMatch } from '/@/api/matches.api'
import { IMinimalMatch } from '/@/interfaces/match'

const props = defineProps({
    matchID: {
        type: String,
        required: true
    }
})

const match = computed(() => props.matchID)
const message = useMessage()
const store = useStore()

const loading = ref(true)
const foundMatch = computed(() => store.state.matchInfo)

onMounted(async () => {
    if (store.state.matchInfo) {
        loading.value = false
        return
    }
    await getMatch(match.value)
    .then((resp) => {
        loading.value = true
        store.commit('SET_MATCH_INFO', resp.data)
    })
    .catch((err) => {
        message.error(err.message)
    })
    .finally(() => loading.value = false)
})

const columns = [
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

</script>