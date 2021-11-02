<template>
<section>
    <n-space vertical>
        <div v-for="request in reviewRequests">
            <ReviewRequestCard :reviewRequest="request" :author="request.author!" />
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

</script>