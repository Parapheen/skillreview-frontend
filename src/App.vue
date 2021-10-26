<template>
    <n-layout>
        <n-layout-header bordered>
            <NavBar/>
        </n-layout-header>
        <n-layout-content content-style="max-width: 80vw; min-height: 100vh; margin: auto;">
            <router-view></router-view>
        </n-layout-content>
        <n-layout-footer>
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


const route = useRoute()
const searchQuery = computed(() => route.query)
const message = useMessage()
const store = useStore()

watch(searchQuery, async (newSearchQuery) => {
    if (newSearchQuery["openid.claimed_id"]) {
        const steamResponse: ISteamResponse = {
            assocHandle: route.query["openid.assoc_handle"]!.toString(),
            claimedId: route.query["openid.claimed_id"]!.toString(),
            identity: route.query["openid.identity"]!.toString(),
            mode: route.query["openid.mode"]!.toString(),
            ns: route.query["openid.ns"]!.toString(),
            opEndpoint: route.query["openid.op_endpoint"]!.toString(),
            responseNonce: route.query["openid.response_nonce"]!.toString(),
            returnTo: route.query["openid.return_to"]!.toString(),
            sig: route.query["openid.sig"]!.toString(),
            signed: route.query["openid.signed"]!.toString(),
        }
        if (steamResponse.mode == 'id_res') {
            await completeAuth(steamResponse)
            .then((resp) => {
                console.log(resp)
                const token = resp.headers['authorization'].toString().split(' ').pop()
                if (token) {
                    window.localStorage.setItem('token', token)
                }
                store.commit('SET_USER', resp.data)
                console.log(store.state.user)
                message.success('Successfully logged in!')
            })
            .catch((err) => {
                console.log(err)
                message.error(err.message)
            })
        }
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