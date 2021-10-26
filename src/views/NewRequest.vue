<template>
<n-space vertical>
    <n-input-group style="margin-top: 4rem; justify-content: center;">
        <n-input :loading="loading" :style="{ width: '50%' }" clearable placeholder="Enter Match ID" />
        <n-button @click="loading=!loading" type="primary" ghost>Search</n-button>
    </n-input-group>
</n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false)
</script>