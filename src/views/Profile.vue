<template>
 <n-page-header style="margin-top: 4rem;" subtitle="Statistics" :title="user?.nickname">
    <n-grid cols="4" item-responsive responsive="screen">
      <n-gi span="2 s:2 m:1">
        <n-statistic label="Skill Requests" :value="user?.review_requests ? user?.review_requests.length : 0" />
      </n-gi>
      <n-gi span="2 s:2 m:1">
        <n-statistic label="Skill Reviews" :value="user?.reviews ? user?.reviews.length : 0" />
      </n-gi>
      <n-gi span="2 s:2 m:1">
        <n-statistic label="Rank" :value="user?.rank" />
      </n-gi>
      <n-gi span="2 s:2 m:1">
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
              <div v-if="user && user?.review_requests!.length > 0" v-for="request in user?.review_requests" :key="request.id">
                <ReviewRequestCard @click="amplitude.getInstance().logEvent('request-card-click-from-profile');" active :reviewRequest="request" :author="user" />
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
              <div v-if="user && user?.reviews!.length > 0" v-for="review in user?.reviews" :key="review.id">
                <ReviewCard @click="amplitude.getInstance().logEvent('review-card-click-from-profile');" :isNavToRequest="true" :review="review" :author="user"/>
              </div>
              <n-empty v-else-if="user && isReviewer(user.rank) && user.reviews?.length == 0" description="You have no reviews yet">
                <template #extra>
                    <n-button @click="() => router.push('/requests')" size="small">Review somebody's Match</n-button>
                </template>
            </n-empty>
              <n-empty v-else-if="user && !isReviewer(user.rank)" description="Your rank is not enough to review others">
                <template #extra>
                    <n-p>If you still want to review games and think that you can coach. Please fill the application!</n-p>
                    <n-button @click="() => router.push('/reviewers/new')" size="small">Submit application</n-button>
                </template>
            </n-empty>
          </section>
      </n-tab-pane>
       <n-tab-pane v-if="user && applications.length > 0" name="Applications" tab="Submitted Applications">
          <section style="margin-top: 2rem;">
               <n-data-table
                style="margin-top: 1rem;"
                :row-key="(row: any) => row.id"
                :columns="columns"
                :data="applications"
              />
          </section>
      </n-tab-pane>
    </n-tabs>
</template>

<script setup lang="ts">
import { NTag, useLoadingBar, useMessage } from 'naive-ui';
import { onMounted, ref, Ref, defineComponent, h } from 'vue';
import { useStore } from 'vuex';
import { getUserProfile } from '../api/user.api';
import { IUser } from '../interfaces/user';
import ReviewRequestCard from '../components/ReviewRequestCard.vue';
import { useRouter } from 'vue-router';
import { InformationCircleOutline } from '@vicons/ionicons5'
import ReviewCard from '../components/ReviewCard.vue';
import amplitude from 'amplitude-js';

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
const applications = ref()

const isReviewer = (rank: string) => {
  if (rank === 'Immortal' || store.getters.isVerifiedReviwer) {
    return true
  }
  return false
}

onMounted(async () => {
    loading.start()
    await getUserProfile(store.state.user.token)
    .then((resp) => {
        user.value = resp.data
        user.value.token = store.state.user.token
        var userProperties = {
            reviews: resp.data.reviews?.length,
            requests: resp.data.review_requests?.length
        };
        amplitude.getInstance().setUserProperties(userProperties);
        applications.value = user.value.applications!.map((el: any) => {
          return {
            createdAt: new Date(el.createdAt).toISOString().split('T')[0],
            state: el.state,
          }
        })
        store.commit('SET_USER', user.value)
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

const columns = [
    {
      title: 'Created at',
      key: 'createdAt',
    },
    {
      title: 'State',
      key: 'state',
      render (row: any) {
        return h(
           NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => row.state
            }
          )}
    },
]
</script>
