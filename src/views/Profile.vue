<template>
 <n-page-header style="margin-top: 4rem;" subtitle="Statistics" :title="user?.nickname">
    <n-grid :cols="4">
      <n-gi>
        <n-statistic label="Skill Requests" :value="user?.review_requests ? user?.review_requests.length : 0" />
      </n-gi>
      <n-gi>
        <n-statistic label="Skill Reviews" :value="user?.reviews ? user?.reviews.length : 0" />
      </n-gi>
      <n-gi>
        <n-statistic label="Rank" :value="user?.rank" />
      </n-gi>
      <n-gi>
        <n-statistic label="Pricing plan" :value="user?.plan">
            <template #prefix>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-icon>
                            <InformationCircleOutline />
                        </n-icon>
                    </template>
                        {{user?.plan === 'basic' ? "With basic plan you can submit only three requests per month."
                        : "You are a real pro, you have no limits."}}
                </n-tooltip>
            </template>
        </n-statistic>
      </n-gi>
    </n-grid>
    <!-- <template #extra>
        <n-button>
            Refresh rank
        </n-button>
    </template> -->
    <template #avatar>
      <n-avatar
        :src="user?.avatar"
      />
    </template>
  </n-page-header>
   <n-tabs type="line" style="margin-top: 1rem;">
       <n-tab-pane name="Requests" tab="Submitted Requests">
          <section style="margin-top: 2rem;">
              <div v-if="user && user?.review_requests!.length > 0" v-for="request in user?.review_requests">
                <ReviewRequestCard :reviewRequest="request" :author="user" />
              </div>
              <n-empty v-else-if="user && user.review_requests?.length == 0" description="You have no requests yet">
                <template #extra>
                    <n-button @click="() => router.push('/requests/new')" size="small">Submit new Match</n-button>
                </template>
              </n-empty>
          </section>
      </n-tab-pane>
      <n-tab-pane name="Reviews" tab="Your reviews">
          <section style="margin-top: 2rem;">
              <div v-if="user && user?.reviews!.length > 0" v-for="review in user?.reviews">
                <ReviewCard :isNavToRequest="true" :review="review" :author="user"/>
              </div>
              <n-empty v-else-if="user && user.reviews?.length == 0" description="You have no reviews yet">
                <template #extra>
                    <n-button @click="() => router.push('/requests')" size="small">Review somebody's Match</n-button>
                </template>
            </n-empty>
          </section>
      </n-tab-pane>
    </n-tabs>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { onMounted, ref, Ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { getUserProfile } from '../api/user.api';
import { IUser } from '../interfaces/user';
import ReviewRequestCard from '../components/ReviewRequestCard.vue';
import { useRouter } from 'vue-router';
import { InformationCircleOutline } from '@vicons/ionicons5'
import ReviewCard from '../components/ReviewCard.vue';

defineComponent({
  components: {
    InformationCircleOutline,
  }
})

const user = ref(null) as Ref<IUser | null>
const store = useStore()
const message = useMessage()
const router = useRouter()
const loading = useLoadingBar()

onMounted(async () => {
    loading.start()
    await getUserProfile(store.state.user.token)
    .then((resp) => {
        user.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})
</script>