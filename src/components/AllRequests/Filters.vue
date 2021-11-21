<template>
<n-space vertical>
    <div style="margin-top: 1rem; display: flex; flex-direction: column;">
        <n-text strong depth="1">Player position</n-text>
        <n-radio-group v-model:value="requestsFilterPosition" name="Position" style="margin-top: 0.5rem;">
          <n-radio-button
            v-for="pos in positions"
            :key="pos.value"
            :value="pos.value"
          >
            {{ pos.label }}
          </n-radio-button>
        </n-radio-group>
    </div>
    <div style="margin-top: 1rem; display: flex; flex-direction: column;">
        <n-text strong depth="1">State</n-text>
        <n-radio-group v-model:value="requestsFilterState" name="State">
            <n-space>
                <n-radio v-for="s in states" :key="s.value" :value="s.value">
                    {{ s.label }}
                </n-radio>
            </n-space>
        </n-radio-group>
    </div>
</n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const requestsFilterPosition = computed({
    get () {
      return store.getters.requestsFilters.position
    },
    set (value) {
      if (value === "All") { value = undefined }
      store.commit('SET_FILTER_POSITION', value)
    }
})

const requestsFilterState = computed({
    get () {
      return store.getters.requestsFilters.state
    },
    set (value) {
      store.commit('SET_FILTER_STATE', value)
    }
})


const states = [
    {
        value: "open",
        label: "Open"
    },
    {
        value: "closed",
        label: "Closed"
    },
]

const positions = [
    {
        value: "All",
        label: "All"
    },
    {
        value: "Hard Support",
        label: "Hard Support"
    },
    {
        value: "Support",
        label: "Support"
    },
    {
        value: "Offlane",
        label: "Offlane"
    },
    {
        value: "Mid",
        label: "Mid"
    },
    {
        value: "Carry",
        label: "Carry"
    },
]

</script>