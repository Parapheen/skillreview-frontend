<template>
<section>
    <n-space vertical v-if="reviewRequests?.length > 0">
        <div v-for="request in reviewRequests" :key="request.id">
            <ReviewRequestCard @click="amplitude.getInstance().logEvent('request-card-click-from-all-requests');" active :reviewRequest="request" :author="request.author!" />
        </div>
        <n-pagination on-update:page="loadMore" v-model:page="page" :page-count="pageCount" style="margin: 2rem auto 0 auto; justify-content: center;"/>
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
const pageSize = 2

onMounted(async () => {
    loading.start()
    await getReviewRequests(page.value, pageSize)
    .then((resp) => {
        reviewRequests.value = resp.data
        pageCount.value = Math.ceil(Number(resp.headers["x-total-count"]) / pageSize)
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

const loadMore = async () => {
    loading.start()
    await getReviewRequests(page.value, pageSize)
    .then((resp) => {
        console.log(resp)
        reviewRequests.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
}

amplitude.getInstance().logEvent('all-requests');

</script>
