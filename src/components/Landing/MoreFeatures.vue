<template>
<section style="margin-top: 4rem;">
    <n-divider />
    <n-h1 style="text-align: center;">And many more</n-h1>
    <n-grid cols="1 s:1 m:2" responsive="screen" :x-gap="12" :y-gap="42" style="margin: 4rem auto 0 auto;">
        <n-grid-item style="display: flex; align-items: center; justify-content: start;">
            <div class="feature-text">
                <n-h2>
                    Pick up recent match
                </n-h2>
                <n-p depth="3">
                    Just lost a match and don't understand why? Browse SkillReview right from Steam. Get access to your last 20 games and submit your request with a few clicks.
                </n-p>
            </div>
        </n-grid-item>
        <n-grid-item style="display: flex; justify-content: center; align-items: center;">
            <img :src="ChooseRecent" alt="choose-recent" style="max-width: 100%; height: auto"/>
        </n-grid-item>
    </n-grid>
    <n-grid cols="1 s:1 m:2" responsive="screen" :x-gap="94" :y-gap="42" style="margin: 4rem auto 0 auto;">
        <n-grid-item v-if="width > 640" style="display: flex; justify-content: center; align-items: center;">
            <img :src="Filters" alt="filters" style="max-width: 100%; height: auto"/>
        </n-grid-item>
        <n-grid-item style="display: flex; align-items: center; justify-content: end;">
            <div class="feature-text">
                <n-h2>
                    Filter matches by position
                </n-h2>
                <n-p depth="3">
                    Review requests matching your main position or learn new role by studying review of others.
                </n-p>
            </div>
        </n-grid-item>
         <n-grid-item v-if="width <= 640" style="display: flex; justify-content: center; align-items: center;">
            <img :src="Filters" alt="filters" style="max-width: 100%; height: auto"/>
        </n-grid-item>
    </n-grid>
    <n-grid cols="1 s:1 m:2" responsive="screen" :x-gap="92" :y-gap="42" style="margin: 4rem auto 0 auto;">
        <n-grid-item style="display: flex; align-items: center; justify-content: start;">
            <div class="feature-text">
                <n-h2>
                    Quick stats for each match
                </n-h2>
                <n-p depth="3">
                    We parse each submission for quick match statistics. Get insights before you dive into replay analysis.
                </n-p>
            </div>
        </n-grid-item>
        <n-grid-item style="display: flex; justify-content: center; align-items: center;">
            <img :src="Stats" alt="stats" style="max-width: 100%; height: auto"/>
        </n-grid-item>
    </n-grid>
</section>
</template>

<script setup lang="ts">
import ChooseRecent from '/@/assets/choose-recent.svg'
import Filters from '/@/assets/filters.svg'
import Stats from '/@/assets/stats.svg'

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