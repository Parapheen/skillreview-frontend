<template>
<section style="margin-top: 6rem;" >
    <n-divider/>
    <n-space vertical justify="center" style="margin-top: 4rem;">
            <n-h1 style="text-align: center;">How it works</n-h1>
            <n-steps style="padding: 2px; margin-top: 2rem;" :vertical="width < 1054">
                <n-step
                    title="Enter Dota 2 match ID"
                    description="Describe your game. What you planned, what went well and what bad."
                />
                <n-step
                    title="Submit your Request"
                    description="Your request to review the match will be available to community."
                />
                <n-step
                    title="Recieve gameplay reviews"
                    description="Players will review your game, give you advice and rate your skills."
                />
                <n-step
                    title="Learn from reviews"
                    description="Accept critique and work with it."
                />
            </n-steps>
        </n-space>
</section>
</template>

<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue';

let width = ref(0)

const handleResize = () => {
    width.value = window.innerWidth;
}

onMounted(() => {
     window.addEventListener('resize', handleResize);
     width.value = window.innerWidth;
})

onDeactivated(() => {
    window.removeEventListener('resize', handleResize);
})
</script>