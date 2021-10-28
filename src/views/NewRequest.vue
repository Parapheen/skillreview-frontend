<template>
<n-space vertical>
    <n-steps size="medium" :current="current" :status="currentStatus" style="padding: 0 2rem; margin-top: 4rem; justify-content: center;">
      <n-step
        title="Choose match"
      />
      <n-step
        title="Describe your perfomance"
      />
      <n-step
        title="Review and submit your request"
      />
    </n-steps>
    <n-space style="justify-content: center; margin-top: 1rem;">
      <n-button-group>
        <n-button @click="prev" :disabled="currentRef === 1">
          <template #icon>
            <n-icon>
              <ArrowBackSharp />
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next" :disabled="matchID === '' ? true : false">
          <template #icon>
            <n-icon>
              <ArrowForwardSharp />
            </n-icon>
          </template>
        </n-button>
      </n-button-group>
    </n-space>
    <MatchPick v-if="current === 1" :matches="matches"/>
    <PerfomanceDescription v-else-if="current === 2" />
</n-space>
</template>

<script setup lang="ts">
import { ref, Ref, defineComponent, onMounted, computed } from 'vue';
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex';
import MatchPick from '../components/NewRequest/MatchPick.vue';
import { getRecentMatches } from '/@/api/user.api';
import { ArrowBackSharp, ArrowForwardSharp } from '@vicons/ionicons5'
import { IMatch } from '../interfaces/match';
import PerfomanceDescription from '../components/NewRequest/PerfomanceDescription.vue';

defineComponent({
  components: {
    ArrowBackSharp,
    ArrowForwardSharp
  }
})

const message = useMessage()
const store = useStore()

const currentRef = ref(1) as Ref<number>
const currentStatus = ref('process')
const current = currentRef
const matches = ref([]) as Ref<IMatch[]>
const matchID = computed(() => store.getters.reviewRequestMatch)


const next = () => {
    if (currentRef.value === 3) currentRef.value = 3
    else currentRef.value++
}
const prev = () => {
    if (currentRef.value === 1) currentRef.value = 1
    else currentRef.value--
}

onMounted(async () => {
    await getRecentMatches(store.state.user.id, store.state.user.token)
    .then((resp) => {
        matches.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
})

</script>