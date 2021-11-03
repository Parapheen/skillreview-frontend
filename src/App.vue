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
import { useRoute } from 'vue-router';
import { completeAuth } from './api/auth.api';
import { useMessage } from 'naive-ui';
import { ISteamResponse } from './interfaces/auth';
import { useStore } from 'vuex';
import router from './router';
import { IUser } from './interfaces/user';


const route = useRoute()
const searchQuery = computed(() => route.query)
const message = useMessage()
const store = useStore()

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

</script>

<style scoped>
.n-layout-footer {
  opacity: 0.6;
  padding: 30px;
  text-align: center;
}
</style>