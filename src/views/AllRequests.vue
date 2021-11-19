<template>
<section>
    <n-space vertical v-if="reviewRequests?.length > 0">
        <div v-for="request in reviewRequests" :key="request.id">
            <ReviewRequestCard @click="amplitude.getInstance().logEvent('request-card-click-from-all-requests');" active :reviewRequest="request" :author="request.author!" />
        </div>
        <n-pagination v-model:page="page" :page-count="pageCount" style="margin: 2rem auto 0 auto;"/>
    </n-space>
    <n-empty v-else description="Nothing found :(" style="margin-top: 4rem;" />
</section>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { onMounted, ref, Ref } from 'vue';
import { getReviewRequests } from '../api/reviewRequests.api';
import { IReviewRequest } from '../interfaces/reviewRequest';
import ReviewRequestCard from '../components/ReviewRequestCard.vue';
import amplitude from 'amplitude-js';

const reviewRequests = ref(null) as Ref<Array<IReviewRequest> | null>

const loading = useLoadingBar()
const message = useMessage()
const page = ref(1)
const pageCount = ref(10)

onMounted(async () => {
    loading.start()
    await getReviewRequests()
    .then((resp) => {
        reviewRequests.value = resp.data
        console.log(resp)
        pageCount.value = Number(resp.headers["Total-Count"])
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

amplitude.getInstance().logEvent('all-requests');

</script>
