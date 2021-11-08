<template>
<section>
    <n-space style="margin-top: 4rem; display: flex; justify-content: space-between;">
        <n-tag :type="reviewRequest?.state === 'open' ? 'info' : 'error'">{{ reviewRequest?.state?.toUpperCase() }}</n-tag> 
        <n-button v-if="reviewRequest?.state === 'open' && reviewRequest?.author?.id !== store.state.user.id" type="primary" ghost @click="startReview" style="margin: auto; width: 100%;">
            Start Review
        </n-button>
        <n-popconfirm
            @positive-click="closeSubmissions"
            :negative-text="null"
            placement="left"
        >
            <template #trigger>
                <n-button v-if="reviewRequest?.author?.id === store.state.user.id" type="error" ghost>
                    Close submissions
                </n-button>
            </template>
            Do you really want to close submissions to review your Match?
        </n-popconfirm>
    </n-space>
     <n-page-header style="margin-top: 1rem;" :subtitle="reviewRequest?.author_rank" :title="reviewRequest?.author?.nickname">
        <n-grid :cols="3">
          <n-gi>
            <n-statistic label="Laning stage rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_laning" />
            </n-statistic>
          </n-gi>
          <n-gi>
             <n-statistic label="Team fighting rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_teamfights" />
            </n-statistic>
          </n-gi>
          <n-gi>
             <n-statistic label="Overall rate by author" >
                <n-rate readonly :value="reviewRequest?.self_rate_overall" />
            </n-statistic>
          </n-gi>
        </n-grid>
        <template #extra>
            Match ID {{reviewRequest?.match_id}}
            <n-button circle style="margin-left: 1rem;" @click="copyMatchID(reviewRequest!.match_id)">
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
              <div v-if="reviewRequest!.reviews!.length > 0" v-for="review in reviewRequest?.reviews">
                <ReviewCard :isNavToRequest="false" :review="review" :author="review.author!" />
              </div>
              <n-empty v-else-if="reviewRequest!.reviews?.length == 0" description="No reviews yet">
                <template #extra>
                    <n-button @click="() => tab = 'submit_review'" size="small">Submit first review</n-button>
                </template>
              </n-empty>
            </n-tab-pane>
            <n-tab-pane display-directive="show" v-if="reviewRequest?.state === 'open'" name="submit_review" tab="Submit Review">
                <div v-if="store.getters.isLoggedIn" style="display: flex; justify-content: center; flex-direction: column;">
                    <n-input id="review-description" v-model:value="reviewDescription" maxlength="256" style="width: 75%; margin: 1rem auto 0 auto;" show-count placeholder="Describe what player did well and what wrong" type="textarea" />
                    <n-grid :cols="3" style="margin-top: 2rem; justify-items: center;">
                        <n-gi style="display: flex; flex-direction: column; justify-content: center;">
                            <n-text>
                                Rate laning stage
                            </n-text>
                            <n-rate v-model:value="reviewRateLaning" style="margin: 3px auto 0 auto;" />
                        </n-gi>
                        <n-gi style="display: flex; flex-direction: column; justify-content: center;">
                            <n-text>
                                Rate teamfighting
                            </n-text>
                            <n-rate v-model:value="reviewRateTeamFighting" style="margin: 3px auto 0 auto;" />
                        </n-gi>
                        <n-gi style="display: flex; flex-direction: column; justify-content: center;">
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
import { useRoute } from 'vue-router';
import { getReviewRequest, updateReviewRequest } from '../api/reviewRequests.api';
import { IReviewRequest, IReviewRequestUpdate } from '../interfaces/reviewRequest';

import { CopyOutline } from '@vicons/ionicons5'
import MatchInfo from '../components/Request/MatchInfo.vue';
import ReviewCard from '../components/ReviewCard.vue';
import { useStore } from 'vuex';
import { createReview } from '../api/review.api';

defineComponent({
    components: {
        CopyOutline
    }
})

const loading = useLoadingBar()
const route = useRoute()
const message = useMessage()
const notification = useNotification()
const store = useStore()
const steamLogin = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${window.location.origin}/&openid.return_to=${window.location.origin}/`

const reviewRequest = ref(null) as Ref<IReviewRequest | null>
const tab = ref("matchInfo")

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
    await createReview(store.state.review, store.state.user.token)
    .then(() => {
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
</script>