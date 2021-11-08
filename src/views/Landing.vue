<template>
<n-space vertical style="margin-top: 4rem;">
    <Jumbo/>
    <Steps/>
    <CTA/>
</n-space>
</template>

<script setup lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Steps from '../components/Landing/Steps.vue';
import Jumbo from '../components/Landing/Jumbo.vue';
import CTA from '../components/Landing/CTA.vue';

defineComponent({
    name: "Landing",
    components: {
        Steps,
        Jumbo,
        CTA,
    }
})

</script>