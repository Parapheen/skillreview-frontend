<template>
    <n-card style="margin: 2rem auto 0 auto; width: 75%" :style="{cursor: cursorType}" :class="hovered && isNavToRequest ? 'card-hovered': ''" @mouseover="hovered = true" @mouseleave="hovered = false" @click="isNavToRequest ? navToRequest(review.review_request_uuid!) : () => {}" >
    <n-spin :show="show">
        <n-thing content-indented>
        <template #avatar>
            <n-avatar
                :src="author?.avatar"
            />
        </template>
        <template #header> {{ author?.nickname }} </template>
        <template #header-extra>
            {{ author?.rank }}
            <n-popover trigger="hover">
                <template #trigger>
                    <n-tag v-if="review.state" style="margin-left: 1rem;" :type="cardType">{{ review.state?.toUpperCase() }}</n-tag> 
                </template>
                <span>{{tagExplanation}}</span>
            </n-popover>
        </template>
        {{ review.description }}
        <template #footer>
        <n-grid :cols="3">
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Laning stage
                </n-text>
                <n-rate readonly :value="review.rate_laning" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Teamfighting
                </n-text>
                <n-rate readonly :value="review.rate_teamfights" />
            </n-gi>
            <n-gi style="display: flex; flex-direction: column; align-items: center;">
                <n-text>
                    Overall perfomance
                </n-text>
                <n-rate readonly :value="review.rate_overall" />
            </n-gi>
        </n-grid>
        </template>
        <template #action>
            <n-button @click="acceptReview" v-if="review.author?.id === user.id && review.state === 'submitted'">Accept Review</n-button>
            <n-button @click="verifyReview" type="warning" ghost style="margin-left: 1rem;" v-if="user.steam64Id === '76561198032200795' && review.state !=='reviewed'">Verify Review</n-button>
        </template>
        </n-thing>
        </n-spin>
    </n-card>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { updateReview } from '../api/review.api';
import { IReview, IReviewUpdate } from '../interfaces/review';
import { IUser } from '../interfaces/user';

const props = defineProps({
	review: {
		type: Object as () => IReview,
		required: true
	},
    author: {
        type: Object as () => IUser | null,
        required: true
    },
    isNavToRequest: {
        type: Boolean,
        required: true
    }
})

const review = computed(() => props.review)
const cursorType = computed(() => props.isNavToRequest ? 'pointer': 'default')
const isNavToRequest = computed(() => props.isNavToRequest)

const router = useRouter()
const store = useStore()
const message = useMessage()

const user = computed(() => store.getters.getUser)

const hovered = ref(false)
const show = ref(false)
const cardType = computed(() => {
    if (review.value.state === 'submitted') { return 'info'}
    else if (review.value.state === 'accepted') { return 'warning'}
    else if (review.value.state === 'reviewed') { return 'success'}
})
const tagExplanation = computed(() => {
    if (review.value.state === 'submitted') { return 'Review is awaiting to be accepted by author and review by stuff'}
    else if (review.value.state === 'accepted') { return 'Review is accepted and being evaluated by stuff'}
    else if (review.value.state === 'reviewed') { return 'Review has been examined by stuff'}
})

const navToRequest = (id: string) => {
    router.push(`/requests/${id}`)
}

const acceptReview = async () => {
    show.value = true
    const update: IReviewUpdate = {
        review_request_uuid: review.value.review_request_uuid!,
        description: review.value.description,
        state: 'accepted'
    } 
    await updateReview(review.value.id!, update, user.value.token)
    .then(() => {
        review.value.state = 'accepted'
    })
    .catch((err) => {
        message.error(err.message)
    })
    show.value = false
}

const verifyReview = async () => {
    show.value = true
    const update: IReviewUpdate = {
        review_request_uuid: review.value.review_request_uuid!,
        description: review.value.description,
        state: 'reviewed'
    } 
    await updateReview(review.value.id!, update, user.value.token)
    .then(() => {
        review.value.state = 'reviewed'
    })
    .catch((err) => {
        message.error(err.message)
    })
    show.value = false
}

</script>

<style scoped>

.card-hovered {
    border-color: #63e2b7;
}

</style>