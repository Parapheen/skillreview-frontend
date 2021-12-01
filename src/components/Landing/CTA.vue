<template>
<section>
    <n-space vertical justify="center" style="margin-top: 6rem;">
            <n-card class='cta' style="padding: 1rem; background-color: rgba(255, 255, 255, 0.06); margin: 4rem auto 2rem auto;">
                <div class="content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <n-h2 style="text-align: center; margin-bottom: 0;">Ready to review some matches?</n-h2>
                    <n-button strong secondary type="primary" @click="login" size="large" icon-placement="right">
                        Get started
                        <template #icon>
                            <n-icon>
                                <ArrowForwardSharp />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </n-card>
    </n-space>
</section>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import router from '/@/router';
import {
  ArrowForwardSharp,
} from '@vicons/ionicons5'

defineComponent({
  components: {
    ArrowForwardSharp,
  }
})

const store = useStore()
const isLoggedIn = computed(() => store.getters.isLoggedIn)

const login = () => {
    if (!isLoggedIn.value) {
        window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/steam`;
    }
    else {
        router.push('/reviewers/new')
    }
}

</script>

<style scoped>

.cta {
    box-shadow: #63e2b7 0px 1px 9px 1px;
    width: 75%;
}

@media only screen and (max-width: 600px) {

  .cta {
        width: 90%;
    }
  .cta button {
      margin: 2rem auto 0 auto;
  }
}

</style>