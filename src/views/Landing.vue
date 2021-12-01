<template>
<n-space vertical style="margin: 8rem auto 0 auto; max-width: 1128px;">
    <Jumbo/>
    <Features />
    <Steps/>
    <CTA/>
</n-space>
</template>

<script setup lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Steps from '../components/Landing/Steps.vue';
import Jumbo from '../components/Landing/Jumbo.vue';
import CTA from '../components/Landing/CTA.vue';
import Features from '../components/Landing/Features.vue';
import amplitude from 'amplitude-js';

defineComponent({
    name: "Landing",
    components: {
        Steps,
        Jumbo,
        CTA,
    }
})

amplitude.getInstance().logEvent('landing');

</script>