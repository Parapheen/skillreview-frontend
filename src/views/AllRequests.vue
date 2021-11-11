<template>
<section>
    <n-space vertical>
        <div v-for="request in reviewRequests">
            <ReviewRequestCard @click="amplitude.getInstance().logEvent('request-card-click-from-all-requests');" active :reviewRequest="request" :author="request.author!" />
        </div>
    </n-space>
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

onMounted(async () => {
    loading.start()
    await getReviewRequests()
    .then((resp) => {
        reviewRequests.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

amplitude.getInstance().logEvent('all-requests');

</script>