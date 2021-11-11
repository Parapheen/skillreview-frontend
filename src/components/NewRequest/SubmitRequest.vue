<template>
<section style="display: flex; justify-content: center; flex-direction: column;">
    <ReviewRequestCard :active="false" :reviewRequest="reviewRequest" :author="store.state.user" />
    <n-button @click="submitReviewRequest" style="width: 75%; margin: auto;">
        Submit
    </n-button>
</section>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { IReviewRequest } from '/@/interfaces/reviewRequest';
import ReviewRequestCard from '../ReviewRequestCard.vue';
import { createReviewRequest } from '/@/api/reviewRequests.api';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import amplitude from 'amplitude-js';

const store = useStore()
const message = useMessage()
const router = useRouter()

const reviewRequest: IReviewRequest = {
    match_id: store.getters.reviewRequestMatch,
    description: store.getters.reviewRequestDescription,
    hero_played: store.getters.reviewRequestHeroPlayed,
    author_uid: store.state.user.id,
    self_rate_laning: store.getters.reviewRequestRateLaning,
    self_rate_teamfights: store.getters.reviewRequestRateTeamFighting,
    self_rate_overall: store.getters.reviewRequestRateOverall,
    author_rank: store.getters.getUserRank,
}

const submitReviewRequest = async () => {
    await createReviewRequest(reviewRequest, store.state.user.token)
    .then((resp) => {
        amplitude.getInstance().logEvent('request-submitted');
        message.success("Got ya!")
        router.push(`/requests/${resp.data.id}`)
    })
    .catch((err) => {
        message.error(err.message)
    })
}

</script>