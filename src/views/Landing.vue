<template>
<n-space vertical style="margin: 8rem auto 0 auto; max-width: 1128px;">
    <Jumbo />
    <Features />
    <HowItWorks />
    <MoreFeatures />
    <CTA />
</n-space>
</template>

<script setup lang="ts">
import { defineComponent } from '@vue/runtime-core';
import HowItWorks from '../components/Landing/HowItWorks.vue';
import Jumbo from '../components/Landing/Jumbo.vue';
import CTA from '../components/Landing/CTA.vue';
import MoreFeatures from '../components/Landing/MoreFeatures.vue';
import Features from '../components/Landing/Features.vue';
import amplitude from 'amplitude-js';

defineComponent({
    name: "Landing",
    components: {
        HowItWorks,
        Jumbo,
        Features,
        MoreFeatures,
        CTA,
    }
})

amplitude.getInstance().logEvent('landing');

</script>