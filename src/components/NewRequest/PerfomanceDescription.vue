<template>
    <section style="margin: 2rem auto 0 auto; display: flex; justify-content: center; flex-direction: column;">
        <n-select placeholder="Please select position you played" v-model:value="position" :options="options" style="width: 75%; margin: 1rem auto 0 auto;" />
        <n-input v-model:value="requestDescription" maxlength="256" style="width: 75%; margin: 1rem auto 0 auto;" show-count placeholder="Describe what went well and what wrong" type="textarea" />
        <n-grid :cols="3" style="margin-top: 2rem; justify-items: center;">
            <n-gi style="display: flex; flex-direction: column; justify-content: center;">
                <n-text>
                    Rate your laning stage
                </n-text>
                <n-rate v-model:value="requestRateLaning" style="margin: 3px auto 0 auto;" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; justify-content: center;">
                <n-text>
                    Rate your teamfighting
                </n-text>
                <n-rate v-model:value="requestRateTeamFighting" style="margin: 3px auto 0 auto;" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; justify-content: center;">
                <n-text>
                    Rate your overall perfomance
                </n-text>
                <n-rate v-model:value="requestRateOverall" style="margin: 3px auto 0 auto;" />
            </n-gi>
        </n-grid>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const options = [
    {
        label: "Hard Support",
        value: 'Hard Support',
    },
    {
        label: "Support",
        value: 'Support',
    },
    {
        label: "Offlane",
        value: 'Offlane',
    },
    {
        label: "Mid",
        value: 'Mid',
    },
    {
        label: "Carry",
        value: 'Carry',
    },
]

const requestDescription = computed({
    get () {
      return store.getters.reviewRequestDescription
    },
    set (value) {
      store.commit('SET_DESCRIPTION', value)
    }
})

const requestRateLaning = computed({
    get () {
      return store.getters.reviewRequestRateLaning
    },
    set (value) {
      store.commit('SET_SELF_RATE_LANING', value)
    }
})

const requestRateTeamFighting = computed({
    get () {
      return store.getters.reviewRequestRateTeamFighting
    },
    set (value) {
      store.commit('SET_SELF_RATE_TEAMFIGHTING', value)
    }
})

const requestRateOverall = computed({
    get () {
      return store.getters.reviewRequestRateOverall
    },
    set (value) {
      store.commit('SET_SELF_RATE_OVERALL', value)
    }
})

const position = computed({
    get () {
      return store.getters.reviewRequestPosition
    },
    set (value) {
      store.commit('SET_POSITION', value)
    }
})

</script>