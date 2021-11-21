<template>
<section>
    <div class="header" style="display: flex; justify-content: space-between; margin: 3rem auto 0 auto; width: 75%;">
        <n-popover trigger="click" placement="bottom" :show-arrow="false" :show="showFilters">
            <template #trigger>
                <n-button icon-placement="right" @click="showFilters = !showFilters">
                    <template #icon>
                        <n-icon>
                            <FilterOutline />
                        </n-icon>
                    </template>
                    Filters
                </n-button>
            </template>
            <Filters />
            <n-divider />
            <n-button ghost @click="onApply">Apply</n-button>
        </n-popover>
        <n-button ghost type="primary" icon-placement="right" @click="router.push('/requests/new')">
            <template #icon>
                <n-icon>
                    <AddOutline />
                </n-icon>
            </template>
            Add new request
        </n-button>
    </div>
    <n-space vertical v-if="reviewRequests && reviewRequests.length > 0">
        <div v-for="request in reviewRequests" :key="request.id">
            <ReviewRequestCard @click="amplitude.getInstance().logEvent('request-card-click-from-all-requests');" active :reviewRequest="request" :author="request.author!" />
        </div>
        <n-pagination v-model:page="pageNumber" :page-count="pageCount" style="margin: 2rem auto 0 auto; justify-content: center;"/>
    </n-space>
    <n-empty v-else description="Nothing found :(" style="margin-top: 4rem;" />
</section>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { computed, onMounted, ref, Ref, watch } from 'vue';
import { getReviewRequests } from '../api/reviewRequests.api';
import { IReviewRequest } from '../interfaces/reviewRequest';
import ReviewRequestCard from '../components/ReviewRequestCard.vue';
import Filters from '../components/AllRequests/Filters.vue';
import amplitude from 'amplitude-js';
import {
    FilterOutline,
    AddOutline
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const reviewRequests = ref(null) as Ref<Array<IReviewRequest> | null>

const loading = useLoadingBar()
const message = useMessage()
const router = useRouter()
const store = useStore()

const filters = computed(() => store.getters.requestsFilters)
const showFilters = ref(false)
const pageNumber = ref(1)
const pageCount = ref(10)
const pageSize = 5

onMounted(async () => {
    loading.start()
    await getReviewRequests(pageNumber.value, pageSize, filters.value.state, filters.value.position)
    .then((resp) => {
        reviewRequests.value = resp.data
        pageCount.value = Math.ceil(Number(resp.headers["x-total-count"]) / pageSize)
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

watch(pageNumber, async (newPage) => {
    loading.start()
    await getReviewRequests(newPage, pageSize, filters.value.state, filters.value.position)
    .then((resp) => {
        reviewRequests.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

const onApply = async () => {
    loading.start()
    await getReviewRequests(pageNumber.value, pageSize, filters.value.state, filters.value.position)
    .then((resp) => {
        reviewRequests.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
    showFilters.value = false
}

amplitude.getInstance().logEvent('all-requests');

</script>
