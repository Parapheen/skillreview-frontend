<template>
<section>
    <n-space style="margin-top: 4rem; display: flex; justify-content: space-between;">
        <n-tag :type="reviewRequest?.state === 'open' ? 'info' : 'error'">{{ reviewRequest?.state?.toUpperCase() }}</n-tag>
        <n-button v-if="reviewRequest?.state === 'open' && reviewRequest?.author?.id !== store.state.user.id" type="primary" ghost @click="startReview" style="margin: auto; width: 100%;">
            Start Review
        </n-button>
        <div v-if="reviewRequest?.author?.id === store.state.user.id || user.steam64Id === '76561198032200795'" style="display: flex; align-items: center;">
            <n-popconfirm
                @positive-click="closeSubmissions"
                :negative-text="null"
                placement="left"
                v-if="reviewRequest?.state !== 'closed'"
            >
                <template #trigger>
                    <n-button type="error" ghost>
                        Close submissions
                    </n-button>
                </template>
                Do you really want to close submissions to review your Match?
            </n-popconfirm>
            <n-popconfirm
                @positive-click="deleteRequest"
                :negative-text="null"
                placement="left"
            >
                <template #trigger>
                    <n-button type="error" style="margin-left: 10px;">
                        <template #icon>
                            <n-icon>
                                <TrashOutline />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                Do you really want to delete your request?
            </n-popconfirm>
        </div>
    </n-space>
     <n-page-header style="margin-top: 1rem;">
        <template #title>
            <div class="author" style="display: flex; flex-direction: column;">
                {{ reviewRequest?.author?.nickname }}
                <n-text depth="3">
                    {{reviewRequest?.position}} | {{ reviewRequest?.author_rank }}
                </n-text>
            </div>
        </template>
        <n-grid cols="3" item-responsive responsive="screen">
          <n-gi span="3 s:3 m:1">
            <n-statistic label="Laning stage rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_laning" />
            </n-statistic>
          </n-gi>
          <n-gi span="3 s:3 m:1">
             <n-statistic label="Team fighting rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_teamfights" />
            </n-statistic>
          </n-gi>
          <n-gi span="3 s:3 m:1">
             <n-statistic label="Overall rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_overall" />
            </n-statistic>
          </n-gi>
        </n-grid>
        <template #extra>
            MatchID {{reviewRequest?.match_id}}
            <n-button circle style="margin-left: 3px;" @click="copyMatchID(reviewRequest!.match_id)">
                <template #icon>
                    <n-icon>
                        <CopyOutline />
                    </n-icon>
                </template>
            </n-button>
        </template>
        <template #avatar>
            <n-avatar>
                <n-icon round>
                      <i :class="'d2mh hero-' + reviewRequest?.hero_played.toString()"/>
                </n-icon>
            </n-avatar>
        </template>
        <template #footer>
                <n-descriptions label-placement="top" title="Description">
                    <n-descriptions-item>
                        {{reviewRequest?.description}}
                    </n-descriptions-item>
                </n-descriptions>
        </template>
      </n-page-header>
       <n-tabs v-model:value="tab" type="card" style="margin-top: 2rem;">
            <n-tab-pane v-if="reviewRequest" name="matchInfo" tab="Match Info">
                <MatchInfo :matchID="reviewRequest.match_id" />
            </n-tab-pane>
            <n-tab-pane name="reviews" tab="Skill Reviews">
              <div v-if="reviewRequest!.reviews!.length > 0" v-for="review in reviewRequest?.reviews" :key="review.id">
                <ReviewCard :requestAuthorId="reviewRequest?.author?.id" :isNavToRequest="false" :review="review" :author="review.author!" />
              </div>
              <n-empty v-else-if="reviewRequest!.reviews?.length == 0" description="No reviews yet">
                <template #extra>
                    <n-button @click="() => tab = 'submit_review'" size="small">Submit first review</n-button>
                </template>
              </n-empty>
            </n-tab-pane>
            <n-tab-pane display-directive="show" v-if="reviewRequest?.state === 'open'" name="submit_review" tab="Submit Review">
                <div v-if="store.getters.isLoggedIn && isReviewer(user.rank)" style="display: flex; justify-content: center; flex-direction: column;">
                    <n-input id="review-description" v-model:value="reviewDescription" maxlength="256" style="width: 75%; margin: 1rem auto 0 auto;" show-count placeholder="Describe what player did well and what wrong" type="textarea" />
                    <n-grid cols="3" :y-gap="5" item-responsive responsive="screen" style="margin-top: 1rem; justify-items: center;">
                        <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; justify-content: center;">
                            <n-text>
                                Rate laning stage
                            </n-text>
                            <n-rate v-model:value="reviewRateLaning" style="margin: 3px auto 0 auto;" />
                        </n-gi>
                        <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; justify-content: center;">
                            <n-text>
                                Rate teamfighting
                            </n-text>
                            <n-rate v-model:value="reviewRateTeamFighting" style="margin: 3px auto 0 auto;" />
                        </n-gi>
                        <n-gi span="3 s:3 m:1" style="display: flex; flex-direction: column; justify-content: center;">
                            <n-text>
                                Rate overall perfomance
                            </n-text>
                            <n-rate v-model:value="reviewRateOverall" style="margin: 3px auto 0 auto;" />
                        </n-gi>
                    </n-grid>
                    <n-button :disabled="reviewDescription === '' || store.getters.reviewRates.includes(null)" @click="submitReview" style="margin: 2rem auto 0 auto;">
                        Submit
                    </n-button>
                </div>
                <div v-else-if="!isReviewer(user.rank)">
                     <n-result
                        status="403"
                        title="You cannot review because of your rating"
                        description="If you still want to become reviewer, please fill the application below."
                        style="margin-top: 2rem;"
                    >
                        <template #footer>
                        <n-a href="/reviewers/new">Become reviewer</n-a>
                        </template>
                    </n-result>
                </div>
                <div v-else>
                     <n-result
                        status="403"
                        title="403 Forbidden"
                        description="Some of the doors are always close to you."
                        style="margin-top: 2rem;"
                    >
                        <template #footer>
                        <n-a :href="steamLogin">It's easy peasy. Just login with Steam</n-a>
                        </template>
                    </n-result>
                </div>
            </n-tab-pane>
        </n-tabs>
</section>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage, useNotification, NButton } from 'naive-ui';
import { ref, Ref, onMounted, defineComponent, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { deleteReviewRequest, getReviewRequest, updateReviewRequest } from '../api/reviewRequests.api';
import { IReviewRequest, IReviewRequestUpdate } from '../interfaces/reviewRequest';

import { CopyOutline, TrashOutline } from '@vicons/ionicons5'
import MatchInfo from '../components/Request/MatchInfo.vue';
import ReviewCard from '../components/ReviewCard.vue';
import { useStore } from 'vuex';
import { createReview } from '../api/review.api';
import amplitude from 'amplitude-js';

defineComponent({
    components: {
        CopyOutline,
        TrashOutline
    }
})

const loading = useLoadingBar()
const route = useRoute()
const message = useMessage()
const notification = useNotification()
const store = useStore()
const router = useRouter()
const user = computed(() => store.getters.getUser)
const steamLogin = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`

const reviewRequest = ref(null) as Ref<IReviewRequest | null>
const tab = ref("matchInfo")

const isReviewer = (rank: string) => {
  if (rank === 'Immortal') {
    return true
  }
  return false
}

onMounted(async () => {
    loading.start()
    await getReviewRequest(route.params.id.toString())
    .then((resp) => {
        reviewRequest.value = resp.data
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
})

const copyMatchID = (matchId: string) => {
    navigator.clipboard.writeText(matchId)
    .then(() => {
        message.success("Match ID successfully copied!")
    })
    .catch(() => {
        message.error("Could not copy Match ID")
    })
}

const startReview = () => {
    tab.value = "submit_review"
}

const reviewDescription = computed({
    get () {
      return store.getters.reviewDescription
    },
    set (value) {
      store.commit('SET_REVIEW_DESCRIPTION', value)
    }
})

const reviewRateLaning = computed({
    get () {
      return store.getters.reviewRateLaning
    },
    set (value) {
      store.commit('SET_REVIEW_RATE_LANING', value)
    }
})

const reviewRateTeamFighting = computed({
    get () {
      return store.getters.reviewRateTeamFighting
    },
    set (value) {
      store.commit('SET_REVIEW_RATE_TEAMFIGHTING', value)
    }
})

const reviewRateOverall = computed({
    get () {
      return store.getters.reviewRateOverall
    },
    set (value) {
      store.commit('SET_REVIEW_RATE_OVERALL', value)
    }
})

const submitReview = async () => {
    store.commit('SET_RR_ID', reviewRequest.value?.id)
    await createReview(store.getters.getReview, store.getters.getToken)
    .then(() => {
        amplitude.getInstance().logEvent('review-submitted');
        const n = notification.create({
          title: 'We got your review!',
          content: `All reviews go through some verification process: author accepts the review and our stuff approves the review.
We really want SkillReview to be the place to learn and to teach. Therefore, we carefully examine effort put in the reviews.
If you have any questions, don't hesitate to ask in the support (see link at the bottom of the page).`,
          action: () =>
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: async () => {
                  n.destroy()
                  await getReviewRequest(route.params.id.toString())
                    .then((resp) => {
                        reviewRequest.value = resp.data
                        tab.value = "reviews"
                    })
                    .catch((err) => {
                        message.error(err.message)
                    })
                }
              },
              {
                default: () => 'Got it'
              }
            ),
        })
    })
    .catch((err) => {
        message.error(err.message)
    })
}


const closeSubmissions = async () => {
    loading.start()
    const update: IReviewRequestUpdate = {
        description: reviewRequest.value?.description!,
        state: 'closed'
    }
    await updateReviewRequest(reviewRequest.value?.id!, update, store.state.user.token)
    .then(() => {
        reviewRequest.value!.state = 'closed'
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
}

const deleteRequest = async () => {
    loading.start()
    await deleteReviewRequest(reviewRequest.value?.id!, store.state.user.token)
    .then(() => {
        message.success('Deleted your request!')
        router.push('/me')
    })
    .catch((err) => {
        message.error(err.message)
    })
    loading.finish()
}

amplitude.getInstance().logEvent('request-page');
</script>
