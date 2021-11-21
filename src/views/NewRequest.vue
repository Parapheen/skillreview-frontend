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
        <n-button @click="next" :disabled="nextDisabled">
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
    <SubmitRequest v-else-if="current === 3" />
</n-space>
</template>

<script setup lang="ts">
import { ref, Ref, defineComponent, onMounted, computed } from 'vue';
import { useLoadingBar, useMessage } from 'naive-ui'
import { useStore } from 'vuex';
import MatchPick from '../components/NewRequest/MatchPick.vue';
import { getRecentMatches } from '/@/api/user.api';
import { ArrowBackSharp, ArrowForwardSharp } from '@vicons/ionicons5'
import { IMatch } from '../interfaces/match';
import PerfomanceDescription from '../components/NewRequest/PerfomanceDescription.vue';
import SubmitRequest from '../components/NewRequest/SubmitRequest.vue';
import amplitude from 'amplitude-js';

defineComponent({
  components: {
    ArrowBackSharp,
    ArrowForwardSharp
  }
})

const message = useMessage()
const store = useStore()
const loading = useLoadingBar()

const currentRef = ref(1) as Ref<number>
const currentStatus = ref('process')
const current = currentRef
const matches = ref([]) as Ref<IMatch[]>

const matchID = computed(() => store.getters.reviewRequestMatch)
const matchRates = computed(() => store.getters.reviewRequestRates)
const requestDescription = computed(() => store.getters.reviewRequestDescription)
const requestPosition = computed(() => store.getters.reviewRequestPosition)

const nextDisabled = computed(() => {
    if (current.value === 1) {
        return matchID.value === '' ? true : false
    } else if (current.value === 2) {
        if (!matchRates.value.includes(null) && requestDescription.value !== '' && requestPosition.value) {
            return false
        } else { return true }
    } else if (current.value === 3) { return true}
})


const next = () => {
    if (currentRef.value === 3) { currentRef.value = 3 }
    else {
        if (currentRef.value === 1) {
            amplitude.getInstance().logEvent('match-selected');
        }
        else if (currentRef.value === 2) {
            amplitude.getInstance().logEvent('self-review-written');
        }
        currentRef.value++
    }
}
const prev = () => {
    if (currentRef.value === 1) currentRef.value = 1
    else { currentRef.value-- }
}

onMounted(async () => {
    loading.start()
    await getRecentMatches(store.state.user.id, store.state.user.token)
    .then((resp) => {
        matches.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

amplitude.getInstance().logEvent('new-request');

</script>