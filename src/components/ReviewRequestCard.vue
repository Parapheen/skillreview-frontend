<template>
    <n-card style="margin: 2rem auto 0 auto; width: 75%; cursor: pointer;" @mouseover="hovered = true" @mouseleave="hovered = false" :style="hovered ? 'border-color: #63e2b7;' : ''" @click="navToRequest(reviewRequest.id!)">
        <n-thing content-indented>
        <template #avatar>
            <n-avatar>
                <n-icon round>
                    <i :class="'d2mh hero-' + reviewRequest.hero_played"/>
                </n-icon>
            </n-avatar>
        </template>
        <template #header> {{ author?.nickname }} </template>
        <template #header-extra>
            {{ reviewRequest.author_rank }}
            <n-tag v-if="reviewRequest.state" style="margin-left: 1rem;" :type="reviewRequest.state === 'open' ? 'info' : 'error'">{{ reviewRequest.state?.toUpperCase() }}</n-tag> 
        </template>
        <template #description> Reviews: {{reviewRequest.reviews?.length}} </template>
        {{ reviewRequest.description }}
        <template #footer>
        <n-grid :cols="3">
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Laning stage
                </n-text>
                <n-rate readonly :value="reviewRequest.self_rate_laning" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Teamfighting
                </n-text>
                <n-rate readonly :value="reviewRequest.self_rate_teamfights" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { IReviewRequest } from '../interfaces/reviewRequest';
import { IUser } from '../interfaces/user';

const props = defineProps({
	reviewRequest: {
		type: Object as () => IReviewRequest,
		required: true
	},
    author: {
        type: Object as () => IUser | null,
        required: true
    }
})

const reviewRequest = computed(() => props.reviewRequest)

const router = useRouter()

const hovered = ref(false)

const navToRequest = (id: string) => {
    router.push(`/requests/${id}`)
}

</script>