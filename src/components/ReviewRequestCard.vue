<template>
    <n-card style="margin: 2rem auto 0 auto; width: 75%;" :style="{cursor: cursorType, width: windowWidth < 1024 ? '100%' : '75%'}" :class="hovered && isActive ? 'card-hovered': ''" @mouseover="hovered = true" @mouseleave="hovered = false" @click="isActive ? navToRequest(reviewRequest.id!) : () => {}">
        <n-thing>
        <template #avatar>
            <n-avatar>
                    <i :class="'d2mh hero-' + reviewRequest.hero_played.toString()"/>
            </n-avatar>
        </template>
        <template #header> 
            <div class="author" style="display: flex; flex-direction: column;">
                {{ author?.nickname }}
                <div style="display: flex;">
                    <n-text depth="3">
                        {{ reviewRequest.position }} | {{ author?.rank }}
                    </n-text>
                </div>
            </div>
        </template>
        <template #header-extra style="display: flex;">
            <n-tag v-if="reviewRequest.state" style="margin-left: 3px;" :type="reviewRequest.state === 'open' ? 'info' : 'error'">{{ reviewRequest.state?.toUpperCase() }}</n-tag>
        </template>
        <template #description v-if="reviewRequest.reviews"> Reviews: {{reviewRequest.reviews?.length}} </template>
        {{ reviewRequest.description }}
        <template #footer>
        <n-grid cols="3" item-responsive responsive="screen">
            <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Laning stage
                </n-text>
                <n-rate readonly :value="reviewRequest.self_rate_laning" />
            </n-gi>
            <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Teamfighting
                </n-text>
                <n-rate readonly :value="reviewRequest.self_rate_teamfights" />
            </n-gi>
            <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Overall perfomance
                </n-text>
                <n-rate readonly :value="reviewRequest.self_rate_overall" />
            </n-gi>
        </n-grid>
        </template>
        </n-thing>
    </n-card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { IReviewRequest } from '../interfaces/reviewRequest';
import { IUser } from '../interfaces/user';

let windowWidth = ref(0)

const handleResize = () => {
    windowWidth.value = window.innerWidth;
}

onMounted(() => {
     window.addEventListener('resize', handleResize);
     windowWidth.value = window.innerWidth;
})

const props = defineProps({
	reviewRequest: {
		type: Object as () => IReviewRequest,
		required: true
	},
    author: {
        type: Object as () => IUser | null,
        required: true
    },
	active: {
		type: Boolean,
		required: true
	}
})

const reviewRequest = computed(() => props.reviewRequest)
const cursorType = computed(() => props.active ? 'pointer': 'default')
const isActive = computed(() => props.active)

const router = useRouter()

const hovered = ref(false)

const navToRequest = (id: string) => {
    router.push(`/requests/${id}`)
}

</script>


<style scoped>

.card-hovered {
    border-color: #63e2b7;
}

</style>