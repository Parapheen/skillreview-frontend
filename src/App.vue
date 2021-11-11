<template>
    <n-layout>
        <n-layout-header bordered>
            <NavBar/>
        </n-layout-header>
        <n-layout-content content-style="max-width: 80vw; min-height: 100vh; margin: auto;">
            <router-view></router-view>
        </n-layout-content>
        <n-layout-footer style="margin-top: 2rem;">
            <Footer/>
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import { defineComponent, watch, computed } from 'vue';
import AppProvider from '/@/AppProvider.vue';
import NavBar from '/@/components/Navbar.vue';
import Footer from '/@/components/Footer.vue';
import { useRoute, useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { useStore } from 'vuex';
import amplitude from 'amplitude-js';


const route = useRoute()
const router = useRouter()
const searchQuery = computed(() => route.query)
const message = useMessage()
const store = useStore()
const user = computed(() => store.getters.getUser)

watch(searchQuery, async (newSearchQuery) => {
    if (newSearchQuery["accessToken"]) {
        const token = newSearchQuery['accessToken'].toString()
        store.commit('SET_TOKEN', token)
        message.success('Successfully logged in!')
        router.push('/me')
    }
})

defineComponent({
    name: 'App',
    components: {
        AppProvider,
        NavBar,
    },
});

// analytics
if (user.value.id) {
    var identify = new amplitude.Identify().set('email', user.value.email);
    amplitude.getInstance().identify(identify);
    amplitude.getInstance().setUserId(user.value.id);
}
</script>

<style scoped>
.n-layout-footer {
  opacity: 0.6;
  padding: 30px;
  text-align: center;
}
</style>